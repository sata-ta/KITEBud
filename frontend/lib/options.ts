export interface LocalizedText {
  en: string;
  km: string;
}

export const INTEREST_KEYS = [
  "mathematics",
  "science",
  "technology",
  "business",
  "arts_design",
  "languages",
  "social_sciences",
  "helping_people",
];

/* Interest Questions */


export const INTEREST_QUESTIONS = [
  {
    id: "interest_1",

    question: {
      en: "Which subjects do you enjoy learning the most?",
      km: "តើមុខវិជ្ជាណាខ្លះដែលអ្នកចូលចិត្តរៀនជាងគេ?",
    },

    options: [
      {
        label: {
          en: "Mathematics and statistics",
          km: "គណិតវិទ្យា និងស្ថិតិ",
        },
        interests: ["mathematics"],
      },
      {
        label: {
          en: "Science and experiments",
          km: "វិទ្យាសាស្ត្រ និងការពិសោធន៍",
        },
        interests: ["science"],
      },
      {
        label: {
          en: "Computers and technology",
          km: "កុំព្យូទ័រ និងបច្ចេកវិទ្យា",
        },
        interests: ["technology"],
      },
      {
        label: {
          en: "Business and economics",
          km: "អាជីវកម្ម និងសេដ្ឋកិច្ច",
        },
        interests: ["business"],
      },
      {
        label: {
          en: "Art, design, and creativity",
          km: "សិល្បៈ ការរចនា និងការច្នៃប្រឌិត",
        },
        interests: ["arts_design"],
      },
      {
        label: {
          en: "Languages and communication",
          km: "ភាសា និងការទំនាក់ទំនង",
        },
        interests: ["languages"],
      },
      {
        label: {
          en: "Society, psychology, and human behavior",
          km: "សង្គម ចិត្តវិទ្យា និងអាកប្បកិរិយារបស់មនុស្ស",
        },
        interests: ["social_sciences"],
      },
      {
        label: {
          en: "Helping and supporting other people",
          km: "ការជួយ និងគាំទ្រអ្នកដទៃ",
        },
        interests: ["helping_people"],
      },
    ],
  },

  {
    id: "interest_2",

    question: {
      en: "Which activity would you enjoy doing in your free time?",
      km: "តើសកម្មភាពមួយណាដែលអ្នកចូលចិត្តធ្វើនៅពេលទំនេរ?",
    },

    options: [
      {
        label: {
          en: "Solving mathematical problems or puzzles",
          km: "ដោះស្រាយបញ្ហាគណិតវិទ្យា ឬល្បែងផ្គុំរូប",
        },
        interests: ["mathematics"],
      },
      {
        label: {
          en: "Doing experiments or learning how things work",
          km: "ធ្វើការពិសោធន៍ ឬសិក្សាពីរបៀបដែលអ្វីៗដំណើរការ",
        },
        interests: ["science"],
      },
      {
        label: {
          en: "Building something with computers or technology",
          km: "បង្កើតអ្វីមួយដោយប្រើកុំព្យូទ័រ ឬបច្ចេកវិទ្យា",
        },
        interests: ["technology"],
      },
      {
        label: {
          en: "Planning a business or selling something",
          km: "រៀបចំផែនការអាជីវកម្ម ឬលក់ផលិតផល",
        },
        interests: ["business"],
      },
      {
        label: {
          en: "Drawing, designing, or creating content",
          km: "គូរ រចនា ឬបង្កើតមាតិកា",
        },
        interests: ["arts_design"],
      },
      {
        label: {
          en: "Reading, writing, or learning a new language",
          km: "អាន សរសេរ ឬរៀនភាសាថ្មី",
        },
        interests: ["languages"],
      },
      {
        label: {
          en: "Learning about people and society",
          km: "សិក្សាអំពីមនុស្ស និងសង្គម",
        },
        interests: ["social_sciences"],
      },
      {
        label: {
          en: "Volunteering or helping someone solve a problem",
          km: "ចូលរួមស្ម័គ្រចិត្ត ឬជួយអ្នកណាម្នាក់ដោះស្រាយបញ្ហា",
        },
        interests: ["helping_people"],
      },
    ],
  },

  {
    id: "interest_3",

    question: {
      en: "Which type of problem would you most enjoy solving?",
      km: "តើបញ្ហាប្រភេទណាដែលអ្នកចូលចិត្តដោះស្រាយជាងគេ?",
    },

    options: [
      {
        label: {
          en: "Finding patterns and solving numerical problems",
          km: "ស្វែងរកលំនាំ និងដោះស្រាយបញ្ហាលេខ",
        },
        interests: ["mathematics"],
      },
      {
        label: {
          en: "Understanding how nature or physical systems work",
          km: "ស្វែងយល់ពីរបៀបដែលធម្មជាតិ ឬប្រព័ន្ធរូបវិទ្យាដំណើរការ",
        },
        interests: ["science"],
      },
      {
        label: {
          en: "Creating a new app, website, or technology solution",
          km: "បង្កើតកម្មវិធី គេហទំព័រ ឬដំណោះស្រាយបច្ចេកវិទ្យាថ្មី",
        },
        interests: ["technology"],
      },
      {
        label: {
          en: "Finding ways to improve a business",
          km: "ស្វែងរកវិធីកែលម្អអាជីវកម្ម",
        },
        interests: ["business"],
      },
      {
        label: {
          en: "Creating an attractive and creative solution",
          km: "បង្កើតដំណោះស្រាយដែលទាក់ទាញ និងមានភាពច្នៃប្រឌិត",
        },
        interests: ["arts_design"],
      },
      {
        label: {
          en: "Finding the best way to communicate an idea",
          km: "ស្វែងរកវិធីល្អបំផុតក្នុងការបង្ហាញគំនិត",
        },
        interests: ["languages"],
      },
      {
        label: {
          en: "Understanding why people behave differently",
          km: "ស្វែងយល់ពីមូលហេតុដែលមនុស្សមានអាកប្បកិរិយាខុសៗគ្នា",
        },
        interests: ["social_sciences"],
      },
      {
        label: {
          en: "Finding ways to help people overcome difficulties",
          km: "ស្វែងរកវិធីជួយមនុស្សឱ្យជម្នះការលំបាក",
        },
        interests: ["helping_people"],
      },
    ],
  },

  {
    id: "interest_4",

    question: {
      en: "What would you most like to learn more about?",
      km: "តើអ្នកចង់សិក្សាបន្ថែមអំពីអ្វីជាងគេ?",
    },

    options: [
      {
        label: {
          en: "Data, numbers, and statistics",
          km: "ទិន្នន័យ លេខ និងស្ថិតិ",
        },
        interests: ["mathematics"],
      },
      {
        label: {
          en: "Nature, health, physics, or chemistry",
          km: "ធម្មជាតិ សុខភាព រូបវិទ្យា ឬគីមីវិទ្យា",
        },
        interests: ["science"],
      },
      {
        label: {
          en: "AI, programming, and software",
          km: "AI ការសរសេរកម្មវិធី និងសូហ្វវែរ",
        },
        interests: ["technology"],
      },
      {
        label: {
          en: "Entrepreneurship, finance, and management",
          km: "ភាពជាសហគ្រិន ហិរញ្ញវត្ថុ និងការគ្រប់គ្រង",
        },
        interests: ["business"],
      },
      {
        label: {
          en: "Graphic design, fashion, or creative media",
          km: "ការរចនាក្រាហ្វិក ម៉ូដ ឬប្រព័ន្ធផ្សព្វផ្សាយច្នៃប្រឌិត",
        },
        interests: ["arts_design"],
      },
      {
        label: {
          en: "Foreign languages, writing, and communication",
          km: "ភាសាបរទេស ការសរសេរ និងការទំនាក់ទំនង",
        },
        interests: ["languages"],
      },
      {
        label: {
          en: "Psychology, society, and culture",
          km: "ចិត្តវិទ្យា សង្គម និងវប្បធម៌",
        },
        interests: ["social_sciences"],
      },
      {
        label: {
          en: "Education, healthcare, or community development",
          km: "ការអប់រំ សុខាភិបាល ឬការអភិវឌ្ឍសហគមន៍",
        },
        interests: ["helping_people"],
      },
    ],
  },

  {
    id: "interest_5",

    question: {
      en: "Which type of work sounds most interesting to you?",
      km: "តើការងារប្រភេទណាដែលស្តាប់ទៅគួរឱ្យចាប់អារម្មណ៍បំផុតសម្រាប់អ្នក?",
    },

    options: [
      {
        label: {
          en: "Analyzing data and making predictions",
          km: "វិភាគទិន្នន័យ និងធ្វើការព្យាករណ៍",
        },
        interests: ["mathematics"],
      },
      {
        label: {
          en: "Conducting research and experiments",
          km: "ធ្វើការស្រាវជ្រាវ និងការពិសោធន៍",
        },
        interests: ["science"],
      },
      {
        label: {
          en: "Developing software or technology",
          km: "អភិវឌ្ឍសូហ្វវែរ ឬបច្ចេកវិទ្យា",
        },
        interests: ["technology"],
      },
      {
        label: {
          en: "Managing a company or starting a business",
          km: "គ្រប់គ្រងក្រុមហ៊ុន ឬចាប់ផ្តើមអាជីវកម្ម",
        },
        interests: ["business"],
      },
      {
        label: {
          en: "Designing products, graphics, or visual experiences",
          km: "រចនាផលិតផល ក្រាហ្វិក ឬបទពិសោធន៍ដែលមើលឃើញ",
        },
        interests: ["arts_design"],
      },
      {
        label: {
          en: "Writing, translating, or communicating ideas",
          km: "សរសេរ បកប្រែ ឬបង្ហាញគំនិត",
        },
        interests: ["languages"],
      },
      {
        label: {
          en: "Studying people, society, or human behavior",
          km: "សិក្សាអំពីមនុស្ស សង្គម ឬអាកប្បកិរិយារបស់មនុស្ស",
        },
        interests: ["social_sciences"],
      },
      {
        label: {
          en: "Teaching, counseling, or helping others",
          km: "បង្រៀន ផ្តល់ប្រឹក្សា ឬជួយអ្នកដទៃ",
        },
        interests: ["helping_people"],
      },
    ],
  },
];


/* Strength Keys*/


export const STRENGTH_KEYS = [
  "problem_solving",
  "communication",
  "creativity",
  "mathematics",
  "leadership",
  "writing",
  "technology",
  "working_with_people",
];

/* -------------------------------------------------------------------------- */
/* Strength Questions                                                        */
/* -------------------------------------------------------------------------- */

export const STRENGTH_QUESTIONS = [
  {
    id: "strength_1",

    question: {
      en: "Which ability do you think is one of your strongest?",
      km: "តើសមត្ថភាពមួយណាដែលអ្នកគិតថាជាចំណុចខ្លាំងរបស់អ្នក?",
    },

    options: [
      {
        label: {
          en: "Solving difficult problems",
          km: "ដោះស្រាយបញ្ហាលំបាក",
        },
        strengths: ["problem_solving"],
      },
      {
        label: {
          en: "Explaining ideas clearly",
          km: "ពន្យល់គំនិតឱ្យបានច្បាស់",
        },
        strengths: ["communication"],
      },
      {
        label: {
          en: "Coming up with creative ideas",
          km: "បង្កើតគំនិតច្នៃប្រឌិត",
        },
        strengths: ["creativity"],
      },
      {
        label: {
          en: "Working with numbers and mathematics",
          km: "ធ្វើការជាមួយលេខ និងគណិតវិទ្យា",
        },
        strengths: ["mathematics"],
      },
      {
        label: {
          en: "Leading or organizing a group",
          km: "ដឹកនាំ ឬរៀបចំក្រុម",
        },
        strengths: ["leadership"],
      },
      {
        label: {
          en: "Writing clearly",
          km: "សរសេរបានច្បាស់លាស់",
        },
        strengths: ["writing"],
      },
      {
        label: {
          en: "Using computers and technology",
          km: "ប្រើប្រាស់កុំព្យូទ័រ និងបច្ចេកវិទ្យា",
        },
        strengths: ["technology"],
      },
      {
        label: {
          en: "Working well with other people",
          km: "ធ្វើការបានល្អជាមួយអ្នកដទៃ",
        },
        strengths: ["working_with_people"],
      },
    ],
  },

  {
    id: "strength_2",

    question: {
      en: "When you face a difficult task, what are you usually best at?",
      km: "នៅពេលជួបកិច្ចការលំបាក តើអ្នកជាធម្មតាពូកែខាងអ្វី?",
    },

    options: [
      {
        label: {
          en: "Breaking the problem into smaller parts",
          km: "បំបែកបញ្ហាទៅជាផ្នែកតូចៗ",
        },
        strengths: ["problem_solving"],
      },
      {
        label: {
          en: "Discussing it with others",
          km: "ពិភាក្សាជាមួយអ្នកដទៃ",
        },
        strengths: ["communication"],
      },
      {
        label: {
          en: "Finding a creative approach",
          km: "ស្វែងរកវិធីសាស្ត្រដែលមានភាពច្នៃប្រឌិត",
        },
        strengths: ["creativity"],
      },
      {
        label: {
          en: "Using calculations or logical thinking",
          km: "ប្រើការគណនា ឬការគិតដោយតក្កវិជ្ជា",
        },
        strengths: ["mathematics"],
      },
      {
        label: {
          en: "Taking responsibility and leading",
          km: "ទទួលខុសត្រូវ និងដឹកនាំ",
        },
        strengths: ["leadership"],
      },
      {
        label: {
          en: "Researching and writing about it",
          km: "ស្រាវជ្រាវ និងសរសេរអំពីវា",
        },
        strengths: ["writing"],
      },
      {
        label: {
          en: "Using technology to find a solution",
          km: "ប្រើបច្ចេកវិទ្យាដើម្បីស្វែងរកដំណោះស្រាយ",
        },
        strengths: ["technology"],
      },
      {
        label: {
          en: "Asking others for input and working together",
          km: "សុំយោបល់ពីអ្នកដទៃ និងធ្វើការជាមួយគ្នា",
        },
        strengths: ["working_with_people"],
      },
    ],
  },

  {
    id: "strength_3",

    question: {
      en: "Which activity do you usually perform best at?",
      km: "តើសកម្មភាពមួយណាដែលអ្នកជាធម្មតាធ្វើបានល្អជាងគេ?",
    },

    options: [
      {
        label: {
          en: "Solving puzzles or complex problems",
          km: "ដោះស្រាយល្បែងផ្គុំរូប ឬបញ្ហាស្មុគស្មាញ",
        },
        strengths: ["problem_solving"],
      },
      {
        label: {
          en: "Presenting or speaking in front of others",
          km: "ធ្វើបទបង្ហាញ ឬនិយាយនៅមុខអ្នកដទៃ",
        },
        strengths: ["communication"],
      },
      {
        label: {
          en: "Creating new ideas or designs",
          km: "បង្កើតគំនិត ឬការរចនាថ្មីៗ",
        },
        strengths: ["creativity"],
      },
      {
        label: {
          en: "Calculating or analyzing numbers",
          km: "គណនា ឬវិភាគលេខ",
        },
        strengths: ["mathematics"],
      },
      {
        label: {
          en: "Organizing events or leading a team",
          km: "រៀបចំព្រឹត្តិការណ៍ ឬដឹកនាំក្រុម",
        },
        strengths: ["leadership"],
      },
      {
        label: {
          en: "Writing reports, stories, or essays",
          km: "សរសេររបាយការណ៍ រឿង ឬអត្ថបទ",
        },
        strengths: ["writing"],
      },
      {
        label: {
          en: "Working with software or computers",
          km: "ធ្វើការជាមួយសូហ្វវែរ ឬកុំព្យូទ័រ",
        },
        strengths: ["technology"],
      },
      {
        label: {
          en: "Helping a team work together",
          km: "ជួយឱ្យក្រុមធ្វើការជាមួយគ្នាបានល្អ",
        },
        strengths: ["working_with_people"],
      },
    ],
  },

  {
    id: "strength_4",

    question: {
      en: "What do people usually ask you to help them with?",
      km: "តើជាធម្មតាមនុស្សសុំឱ្យអ្នកជួយពួកគេក្នុងរឿងអ្វី?",
    },

    options: [
      {
        label: {
          en: "Solving problems",
          km: "ដោះស្រាយបញ្ហា",
        },
        strengths: ["problem_solving"],
      },
      {
        label: {
          en: "Explaining something",
          km: "ពន្យល់អ្វីមួយ",
        },
        strengths: ["communication"],
      },
      {
        label: {
          en: "Coming up with ideas",
          km: "បង្កើតគំនិត",
        },
        strengths: ["creativity"],
      },
      {
        label: {
          en: "Mathematics or calculations",
          km: "គណិតវិទ្យា ឬការគណនា",
        },
        strengths: ["mathematics"],
      },
      {
        label: {
          en: "Organizing or leading",
          km: "រៀបចំ ឬដឹកនាំ",
        },
        strengths: ["leadership"],
      },
      {
        label: {
          en: "Writing or editing",
          km: "សរសេរ ឬកែសម្រួលអត្ថបទ",
        },
        strengths: ["writing"],
      },
      {
        label: {
          en: "Technology or computers",
          km: "បច្ចេកវិទ្យា ឬកុំព្យូទ័រ",
        },
        strengths: ["technology"],
      },
      {
        label: {
          en: "Working with people",
          km: "ធ្វើការជាមួយមនុស្ស",
        },
        strengths: ["working_with_people"],
      },
    ],
  },

  {
    id: "strength_5",

    question: {
      en: "Which statement describes you best?",
      km: "តើប្រយោគមួយណាពិពណ៌នាអំពីអ្នកបានល្អបំផុត?",
    },

    options: [
      {
        label: {
          en: "I enjoy figuring out how to solve difficult problems",
          km: "ខ្ញុំចូលចិត្តស្វែងរកវិធីដោះស្រាយបញ្ហាលំបាក",
        },
        strengths: ["problem_solving"],
      },
      {
        label: {
          en: "I am comfortable expressing my ideas to others",
          km: "ខ្ញុំមានភាពងាយស្រួលក្នុងការបង្ហាញគំនិតរបស់ខ្ញុំទៅអ្នកដទៃ",
        },
        strengths: ["communication"],
      },
      {
        label: {
          en: "I like creating new and original things",
          km: "ខ្ញុំចូលចិត្តបង្កើតអ្វីដែលថ្មី និងមានលក្ខណៈដើម",
        },
        strengths: ["creativity"],
      },
      {
        label: {
          en: "I am confident working with numbers",
          km: "ខ្ញុំមានទំនុកចិត្តក្នុងការធ្វើការជាមួយលេខ",
        },
        strengths: ["mathematics"],
      },
      {
        label: {
          en: "I naturally take responsibility when working in a group",
          km: "ខ្ញុំតែងតែទទួលខុសត្រូវដោយធម្មជាតិនៅពេលធ្វើការជាក្រុម",
        },
        strengths: ["leadership"],
      },
      {
        label: {
          en: "I enjoy expressing myself through writing",
          km: "ខ្ញុំចូលចិត្តបង្ហាញខ្លួនតាមរយៈការសរសេរ",
        },
        strengths: ["writing"],
      },
      {
        label: {
          en: "I learn and use technology quickly",
          km: "ខ្ញុំរៀន និងប្រើប្រាស់បច្ចេកវិទ្យាបានលឿន",
        },
        strengths: ["technology"],
      },
      {
        label: {
          en: "I enjoy cooperating and supporting other people",
          km: "ខ្ញុំចូលចិត្តសហការ និងគាំទ្រអ្នកដទៃ",
        },
        strengths: ["working_with_people"],
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Career Keys                                                                */
/* -------------------------------------------------------------------------- */

export const CAREER_KEYS = [
  "technology",
  "business",
  "finance",
  "healthcare",
  "engineering",
  "education",
  "design",
  "government_social",
];

/* -------------------------------------------------------------------------- */
/* Career Questions                                                          */
/* -------------------------------------------------------------------------- */

export const CAREER_QUESTIONS = [
  {
    id: "career_1",

    question: {
      en: "What type of career interests you most?",
      km: "តើអាជីពប្រភេទណាដែលអ្នកចាប់អារម្មណ៍ជាងគេ?",
    },

    options: [
      {
        label: {
          en: "Technology and software",
          km: "បច្ចេកវិទ្យា និងសូហ្វវែរ",
        },
        career: "technology",
      },
      {
        label: {
          en: "Business and management",
          km: "អាជីវកម្ម និងការគ្រប់គ្រង",
        },
        career: "business",
      },
      {
        label: {
          en: "Finance and banking",
          km: "ហិរញ្ញវត្ថុ និងធនាគារ",
        },
        career: "finance",
      },
      {
        label: {
          en: "Healthcare and medicine",
          km: "សុខាភិបាល និងវេជ្ជសាស្ត្រ",
        },
        career: "healthcare",
      },
      {
        label: {
          en: "Engineering and infrastructure",
          km: "វិស្វកម្ម និងហេដ្ឋារចនាសម្ព័ន្ធ",
        },
        career: "engineering",
      },
      {
        label: {
          en: "Education and teaching",
          km: "ការអប់រំ និងការបង្រៀន",
        },
        career: "education",
      },
      {
        label: {
          en: "Design and creative industries",
          km: "ការរចនា និងឧស្សាហកម្មច្នៃប្រឌិត",
        },
        career: "design",
      },
      {
        label: {
          en: "Government and social development",
          km: "រដ្ឋាភិបាល និងការអភិវឌ្ឍសង្គម",
        },
        career: "government_social",
      },
    ],
  },

  {
    id: "career_2",

    question: {
      en: "Which type of work would you most enjoy doing?",
      km: "តើការងារប្រភេទណាដែលអ្នកចូលចិត្តធ្វើជាងគេ?",
    },

    options: [
      {
        label: {
          en: "Building software and solving technology problems",
          km: "បង្កើតសូហ្វវែរ និងដោះស្រាយបញ្ហាបច្ចេកវិទ្យា",
        },
        career: "technology",
      },
      {
        label: {
          en: "Managing teams and making business decisions",
          km: "គ្រប់គ្រងក្រុម និងធ្វើការសម្រេចចិត្តផ្នែកអាជីវកម្ម",
        },
        career: "business",
      },
      {
        label: {
          en: "Analyzing money, investments, and financial decisions",
          km: "វិភាគប្រាក់ ការវិនិយោគ និងការសម្រេចចិត្តផ្នែកហិរញ្ញវត្ថុ",
        },
        career: "finance",
      },
      {
        label: {
          en: "Helping people improve their health and well-being",
          km: "ជួយមនុស្សឱ្យមានសុខភាព និងសុខុមាលភាពកាន់តែប្រសើរ",
        },
        career: "healthcare",
      },
      {
        label: {
          en: "Designing and building systems or structures",
          km: "រចនា និងសាងសង់ប្រព័ន្ធ ឬសំណង់",
        },
        career: "engineering",
      },
      {
        label: {
          en: "Teaching and helping others learn",
          km: "បង្រៀន និងជួយអ្នកដទៃរៀន",
        },
        career: "education",
      },
      {
        label: {
          en: "Creating visual and creative experiences",
          km: "បង្កើតបទពិសោធន៍ដែលមើលឃើញ និងមានភាពច្នៃប្រឌិត",
        },
        career: "design",
      },
      {
        label: {
          en: "Working on public services and community development",
          km: "ធ្វើការលើសេវាសាធារណៈ និងការអភិវឌ្ឍសហគមន៍",
        },
        career: "government_social",
      },
    ],
  },

  {
    id: "career_3",

    question: {
      en: "Which career direction would you be most excited to explore?",
      km: "តើទិសដៅអាជីពមួយណាដែលអ្នកចង់ស្វែងយល់ជាងគេ?",
    },

    options: [
      {
        label: {
          en: "Software, AI, or data",
          km: "សូហ្វវែរ AI ឬទិន្នន័យ",
        },
        career: "technology",
      },
      {
        label: {
          en: "Entrepreneurship or management",
          km: "ភាពជាសហគ្រិន ឬការគ្រប់គ្រង",
        },
        career: "business",
      },
      {
        label: {
          en: "Banking, accounting, or investment",
          km: "ធនាគារ គណនេយ្យ ឬការវិនិយោគ",
        },
        career: "finance",
      },
      {
        label: {
          en: "Medicine, nursing, or health services",
          km: "វេជ្ជសាស្ត្រ គិលានុបដ្ឋាយិកា ឬសេវាសុខភាព",
        },
        career: "healthcare",
      },
      {
        label: {
          en: "Civil, electrical, or other engineering fields",
          km: "វិស្វកម្មសំណង់ អគ្គិសនី ឬវិស្វកម្មផ្សេងៗ",
        },
        career: "engineering",
      },
      {
        label: {
          en: "Teaching or academic careers",
          km: "ការបង្រៀន ឬអាជីពសិក្សា",
        },
        career: "education",
      },
      {
        label: {
          en: "Graphic, product, or digital design",
          km: "ការរចនាក្រាហ្វិក ផលិតផល ឬឌីជីថល",
        },
        career: "design",
      },
      {
        label: {
          en: "Government, NGOs, or social development",
          km: "រដ្ឋាភិបាល អង្គការមិនមែនរដ្ឋាភិបាល ឬការអភិវឌ្ឍសង្គម",
        },
        career: "government_social",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Budget Keys                                                                */
/* -------------------------------------------------------------------------- */

export const BUDGET_KEYS = [
  "lt1000",
  "1000_2000",
  "2000_4000",
  "4000_plus",
];

/* -------------------------------------------------------------------------- */
/* Budget Questions                                                           */
/* -------------------------------------------------------------------------- */

export const BUDGET_QUESTIONS = [
  {
    id: "budget_1",

    question: {
      en: "What is your approximate annual budget for university tuition?",
      km: "តើថវិកាប្រចាំឆ្នាំប្រហែលប៉ុន្មានដែលអ្នកអាចចំណាយសម្រាប់ថ្លៃសិក្សានៅសាកលវិទ្យាល័យ?",
    },

    options: [
      {
        label: {
          en: "Less than $1,000",
          km: "តិចជាង $1,000",
        },
        budget: "lt1000",
      },
      {
        label: {
          en: "$1,000–$2,000",
          km: "$1,000–$2,000",
        },
        budget: "1000_2000",
      },
      {
        label: {
          en: "$2,000–$4,000",
          km: "$2,000–$4,000",
        },
        budget: "2000_4000",
      },
      {
        label: {
          en: "More than $4,000",
          km: "ច្រើនជាង $4,000",
        },
        budget: "4000_plus",
      },
    ],
  },

  {
    id: "budget_2",

    question: {
      en: "How important is financial support when choosing a university?",
      km: "តើជំនួយផ្នែកហិរញ្ញវត្ថុមានសារៈសំខាន់កម្រិតណានៅពេលជ្រើសរើសសាកលវិទ្យាល័យ?",
    },

    options: [
      {
        label: {
          en: "I definitely need a scholarship",
          km: "ខ្ញុំត្រូវការអាហារូបករណ៍ជាចាំបាច់",
        },
        budget_support: "required",
      },
      {
        label: {
          en: "A scholarship would be helpful",
          km: "អាហារូបករណ៍នឹងជួយខ្ញុំបាន",
        },
        budget_support: "helpful",
      },
      {
        label: {
          en: "I can study without a scholarship",
          km: "ខ្ញុំអាចរៀនបានដោយមិនចាំបាច់មានអាហារូបករណ៍",
        },
        budget_support: "not_required",
      },
    ],
  },
];

/* -------------------------------------------------------------------------- */
/* Location Keys                                                              */
/* -------------------------------------------------------------------------- */

export const LOCATION_KEYS = [
  "phnom_penh",
  "siem_reap",
  "battambang",
  "anywhere",
];

/* -------------------------------------------------------------------------- */
/* Context Questions                                                          */
/* -------------------------------------------------------------------------- */

export const CONTEXT_QUESTIONS = [
  {
    id: "context_1",

    question: {
      en: "Where do you currently live?",
      km: "តើបច្ចុប្បន្នអ្នករស់នៅទីណា?",
    },

    options: [
      {
        label: {
          en: "Phnom Penh",
          km: "ភ្នំពេញ",
        },
        location: "phnom_penh",
      },
      {
        label: {
          en: "Siem Reap",
          km: "សៀមរាប",
        },
        location: "siem_reap",
      },
      {
        label: {
          en: "Battambang",
          km: "បាត់ដំបង",
        },
        location: "battambang",
      },
      {
        label: {
          en: "Somewhere else",
          km: "ទីកន្លែងផ្សេងទៀត",
        },
        location: "anywhere",
      },
    ],
  },
];