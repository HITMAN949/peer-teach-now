
import { supabase } from "@/integrations/supabase/client";

// Sample subjects for teaching and learning
const subjects = [
  "Mathematics", "Physics", "Chemistry", "Biology", 
  "Computer Science", "English Literature", "Spanish", "French", 
  "History", "Geography", "Economics", "Business Studies",
  "Psychology", "Sociology", "Art", "Music", "Physical Education"
];

// Sample user data
const users = [
  {
    email: "john.doe@example.com",
    password: "password123",
    fullName: "John Doe",
    bio: "Mathematics enthusiast with 3 years of tutoring experience.",
    schoolUniversity: "MIT",
    points: 250,
    teachingSubjects: ["Mathematics", "Physics", "Computer Science"],
    learningSubjects: ["Spanish", "Music"]
  },
  {
    email: "jane.smith@example.com",
    password: "password123",
    fullName: "Jane Smith",
    bio: "Literature graduate with a passion for languages.",
    schoolUniversity: "Harvard University",
    points: 180,
    teachingSubjects: ["English Literature", "Spanish", "French"],
    learningSubjects: ["Mathematics", "Computer Science"]
  },
  {
    email: "alex.johnson@example.com",
    password: "password123", 
    fullName: "Alex Johnson",
    bio: "Biology major looking to share knowledge and learn new subjects.",
    schoolUniversity: "Stanford University",
    points: 120,
    teachingSubjects: ["Biology", "Chemistry"],
    learningSubjects: ["Physics", "History", "Economics"]
  }
];

// Sample teaching offers
const createTeachingOffers = async (userId: string, subjects: string[]) => {
  for (const subject of subjects) {
    await supabase.from('teaching_offers').insert({
      teacher_id: userId,
      subject: subject,
      level: ["Beginner", "Intermediate", "Advanced"][Math.floor(Math.random() * 3)],
      description: `I can help you understand ${subject} concepts with practical examples and exercises.`,
      points_per_hour: Math.floor(Math.random() * 20) + 10,
      location_type: ["Online", "In-person", "Both"][Math.floor(Math.random() * 3)]
    });
  }
};

// Create time slots for offers
const createTimeSlots = async (offerId: string) => {
  const now = new Date();
  for (let i = 1; i <= 5; i++) {
    const startTime = new Date(now);
    startTime.setDate(now.getDate() + i);
    startTime.setHours(9 + Math.floor(Math.random() * 8), 0, 0);
    
    const endTime = new Date(startTime);
    endTime.setHours(startTime.getHours() + 1 + Math.floor(Math.random() * 2));
    
    await supabase.from('time_slots').insert({
      offer_id: offerId,
      start_time: startTime.toISOString(),
      end_time: endTime.toISOString(),
      is_booked: Math.random() > 0.7
    });
  }
};

// Create sessions between users
const createSessions = async (offerId: string, teacherId: string, studentId: string, timeSlotId: string) => {
  const pointsAmount = Math.floor(Math.random() * 50) + 20;
  const platformFee = Math.floor(pointsAmount * 0.1);
  
  await supabase.from('sessions').insert({
    offer_id: offerId,
    teacher_id: teacherId,
    student_id: studentId,
    time_slot_id: timeSlotId,
    status: ["scheduled", "completed", "cancelled"][Math.floor(Math.random() * 3)],
    points_amount: pointsAmount,
    platform_fee: platformFee
  });
};

// Create reviews for completed sessions
const createReviews = async (sessionId: string, reviewerId: string, revieweeId: string) => {
  const rating = Math.floor(Math.random() * 3) + 3; // Ratings between 3-5
  
  await supabase.from('reviews').insert({
    session_id: sessionId,
    reviewer_id: reviewerId,
    reviewee_id: revieweeId,
    rating: rating,
    comment: `Great ${Math.random() > 0.5 ? 'teacher' : 'student'}! I ${Math.random() > 0.5 ? 'learned a lot' : 'enjoyed the session'}.`
  });
};

// Main seed function
export const seedDatabase = async () => {
  try {
    console.log("Starting database seeding...");
    
    // Create users and their profiles
    const createdUsers = [];
    
    for (const user of users) {
      // Create auth user
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email: user.email,
        password: user.password
      });
      
      if (authError) {
        console.error("Error creating user:", authError);
        continue;
      }
      
      const userId = authData.user?.id;
      if (!userId) continue;
      
      createdUsers.push({
        id: userId,
        ...user
      });
      
      // Create profile
      await supabase.from('profiles').insert({
        id: userId,
        full_name: user.fullName,
        bio: user.bio,
        school_university: user.schoolUniversity,
        points: user.points
      });
      
      // Add teaching subjects
      for (const subject of user.teachingSubjects) {
        await supabase.from('teaching_subjects').insert({
          user_id: userId,
          subject: subject
        });
      }
      
      // Add learning subjects
      for (const subject of user.learningSubjects) {
        await supabase.from('learning_subjects').insert({
          user_id: userId,
          subject: subject
        });
      }
      
      // Create teaching offers
      await createTeachingOffers(userId, user.teachingSubjects);
    }
    
    // Create time slots for offers
    const { data: offers } = await supabase.from('teaching_offers').select('id, teacher_id');
    if (offers) {
      for (const offer of offers) {
        await createTimeSlots(offer.id);
      }
    }
    
    // Create some sessions between users
    const { data: timeSlots } = await supabase.from('time_slots').select('id, offer_id');
    const { data: teachingOffers } = await supabase.from('teaching_offers').select('id, teacher_id');
    
    if (timeSlots && teachingOffers && createdUsers.length >= 2) {
      for (let i = 0; i < 10; i++) {
        const randomTimeSlot = timeSlots[Math.floor(Math.random() * timeSlots.length)];
        const matchingOffer = teachingOffers.find(offer => offer.id === randomTimeSlot.offer_id);
        
        if (matchingOffer) {
          const teacherId = matchingOffer.teacher_id;
          
          // Find a different user to be the student
          const potentialStudents = createdUsers.filter(user => user.id !== teacherId);
          const studentId = potentialStudents[Math.floor(Math.random() * potentialStudents.length)].id;
          
          const { data: session } = await supabase.from('sessions').insert({
            offer_id: matchingOffer.id,
            teacher_id: teacherId,
            student_id: studentId,
            time_slot_id: randomTimeSlot.id,
            status: ["scheduled", "completed", "cancelled"][Math.floor(Math.random() * 3)],
            points_amount: Math.floor(Math.random() * 50) + 20,
            platform_fee: Math.floor(Math.random() * 5) + 2
          }).select();
          
          if (session && session[0].status === "completed") {
            // Create reviews for completed sessions
            await createReviews(session[0].id, studentId, teacherId);
          }
        }
      }
    }
    
    console.log("Database seeding completed successfully!");
    return true;
  } catch (error) {
    console.error("Error seeding database:", error);
    return false;
  }
};

// Function to check if database already has seed data
export const checkIfDatabaseSeeded = async () => {
  const { count } = await supabase
    .from('profiles')
    .select('*', { count: 'exact', head: true });
    
  return count !== null && count > 0;
};

// Function to run the seeding process
export const runDatabaseSeed = async () => {
  const isSeeded = await checkIfDatabaseSeeded();
  
  if (!isSeeded) {
    return await seedDatabase();
  } else {
    console.log("Database already contains data. Skipping seed process.");
    return false;
  }
};
