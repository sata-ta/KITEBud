"""
In-memory mock data for the MVP.

This module is the single place the rest of the backend reads majors,
universities, and scholarships from. Swapping to Postgres/Supabase later
means replacing the functions below (get_all_majors, get_all_universities,
get_all_scholarships) with real queries — nothing else in the app should
need to change, since routes and services only ever call these functions.

Khmer translations here are a best-effort starting point for the demo and
should be reviewed by a native speaker before this becomes a production
product.
"""

MAJORS = [
    {
        "id": "data-science",
        "name": {"en": "Data Science", "km": "វិទ្យាសាស្ត្រទិន្នន័យ"},
        "tagline": {"en": "Turn numbers into decisions.", "km": "ប្រែក្លាយលេខទៅជាការសម្រេចចិត្ត។"},
        "description": {
            "en": "Data Science teaches you to collect, clean, and analyze data to find patterns that help organizations make smarter decisions. You'll mix statistics, programming, and storytelling with numbers.",
            "km": "វិទ្យាសាស្ត្រទិន្នន័យបង្រៀនអ្នកឲ្យប្រមូល សម្អាត និងវិភាគទិន្នន័យដើម្បីរកលំនាំដែលជួយឲ្យស្ថាប័នធ្វើការសម្រេចចិត្តកាន់តែឆ្លាតវៃ។",
        },
        "interests": ["mathematics", "technology", "science"],
        "strengths": ["problem_solving", "mathematics", "technology"],
        "career": "technology",
        "budget_friendly": ["1000_2000", "2000_4000"],
        "careers": ["Data Analyst", "Data Scientist", "BI Analyst", "Machine Learning Engineer"],
        "skills": ["Statistics", "Python programming", "Data visualization", "Machine learning basics"],
        "duration_years": 4,
    },
    {
        "id": "computer-science",
        "name": {"en": "Computer Science", "km": "វិទ្យាសាស្ត្រកុំព្យូទ័រ"},
        "tagline": {"en": "Build the logic behind every app.", "km": "សាងសង់តក្កវិជ្ជានៅពីក្រោយកម្មវិធីគ្រប់មុខ។"},
        "description": {
            "en": "Computer Science covers how software and computers actually work: algorithms, programming, and systems. It's a broad foundation for almost any tech career.",
            "km": "វិទ្យាសាស្ត្រកុំព្យូទ័របង្ហាញពីរបៀបដែលកម្មវិធី និងកុំព្យូទ័រដំណើរការ៖ ក្បួនដោះស្រាយ ការសរសេរកម្មវិធី និងប្រព័ន្ធនានា។",
        },
        "interests": ["technology", "mathematics"],
        "strengths": ["problem_solving", "technology", "mathematics"],
        "career": "technology",
        "budget_friendly": ["lt1000", "1000_2000", "2000_4000"],
        "careers": ["Software Developer", "Systems Analyst", "IT Consultant", "Product Manager"],
        "skills": ["Programming fundamentals", "Algorithms", "Systems thinking", "Databases"],
        "duration_years": 4,
    },
    {
        "id": "software-engineering",
        "name": {"en": "Software Engineering", "km": "វិស្វកម្មសូហ្វវែរ"},
        "tagline": {"en": "Design and build software people rely on.", "km": "រចនា និងសាងសង់កម្មវិធីដែលមនុស្សពឹងផ្អែក។"},
        "description": {
            "en": "Software Engineering focuses on designing, building, and maintaining reliable applications, with more emphasis on teamwork, testing, and real-world delivery than Computer Science.",
            "km": "វិស្វកម្មសូហ្វវែរផ្តោតលើការរចនា សាងសង់ និងថែទាំកម្មវិធីឲ្យអាចទុកចិត្តបាន ដោយសង្កត់ធ្ងន់លើការងារជាក្រុម និងការសាកល្បង។",
        },
        "interests": ["technology", "arts_design"],
        "strengths": ["problem_solving", "technology", "creativity"],
        "career": "technology",
        "budget_friendly": ["1000_2000", "2000_4000"],
        "careers": ["Software Engineer", "Mobile App Developer", "QA Engineer", "DevOps Engineer"],
        "skills": ["Software design", "Coding practices", "Teamwork on code", "Testing"],
        "duration_years": 4,
    },
    {
        "id": "information-technology",
        "name": {"en": "Information Technology", "km": "បច្ចេកវិទ្យាព័ត៌មាន"},
        "tagline": {"en": "Keep systems running and secure.", "km": "រក្សាប្រព័ន្ធឲ្យដំណើរការ និងមានសុវត្ថិភាព។"},
        "description": {
            "en": "IT is hands-on and practical: networks, hardware, support, and security. A strong path if you like fixing things and keeping organizations running smoothly.",
            "km": "IT គឺជាជំនាញអនុវត្តជាក់ស្តែង៖ បណ្តាញ ហាដវែរ ជំនួយបច្ចេកទេស និងសុវត្ថិភាពព័ត៌មាន។",
        },
        "interests": ["technology"],
        "strengths": ["technology", "problem_solving"],
        "career": "technology",
        "budget_friendly": ["lt1000", "1000_2000"],
        "careers": ["IT Support Specialist", "Network Administrator", "System Administrator", "Technical Trainer"],
        "skills": ["Networks", "Hardware & software support", "Cybersecurity basics", "Troubleshooting"],
        "duration_years": 4,
    },
    {
        "id": "business-administration",
        "name": {"en": "Business Administration", "km": "រដ្ឋបាលធុរកិច្ច"},
        "tagline": {"en": "Learn to lead teams and run organizations.", "km": "រៀនដឹកនាំក្រុម និងគ្រប់គ្រងស្ថាប័ន។"},
        "description": {
            "en": "A broad business foundation covering management, operations, and strategy. Great if you're not 100% sure which part of business you like yet.",
            "km": "មូលដ្ឋានធុរកិច្ចទូលំទូលាយ គ្របដណ្តប់ការគ្រប់គ្រង ប្រតិបត្តិការ និងយុទ្ធសាស្ត្រ។",
        },
        "interests": ["business", "social_sciences"],
        "strengths": ["leadership", "communication", "working_with_people"],
        "career": "business",
        "budget_friendly": ["lt1000", "1000_2000"],
        "careers": ["Business Analyst", "Operations Manager", "HR Officer", "Entrepreneur"],
        "skills": ["Management basics", "Communication", "Strategic thinking", "Teamwork"],
        "duration_years": 4,
    },
    {
        "id": "accounting",
        "name": {"en": "Accounting", "km": "គណនេយ្យ"},
        "tagline": {"en": "Master the numbers behind every business.", "km": "ស្ទាត់ជំនាញលេខនៅពីក្រោយធុរកិច្ចគ្រប់មុខ។"},
        "description": {
            "en": "Accounting trains you to record, check, and report how money moves through a business. It's a stable, in-demand skill across every industry.",
            "km": "គណនេយ្យបណ្តុះបណ្តាលអ្នកឲ្យកត់ត្រា ត្រួតពិនិត្យ និងរាយការណ៍អំពីលំហូរប្រាក់ក្នុងអាជីវកម្ម។",
        },
        "interests": ["business", "mathematics"],
        "strengths": ["mathematics", "problem_solving"],
        "career": "finance",
        "budget_friendly": ["lt1000", "1000_2000"],
        "careers": ["Accountant", "Auditor", "Tax Advisor", "Bookkeeper"],
        "skills": ["Financial reporting", "Bookkeeping", "Auditing basics", "Attention to detail"],
        "duration_years": 4,
    },
    {
        "id": "finance",
        "name": {"en": "Finance", "km": "ហិរញ្ញវត្ថុ"},
        "tagline": {"en": "Understand how money moves and grows.", "km": "យល់ដឹងពីរបៀបដែលប្រាក់កម្រើក និងលូតលាស់។"},
        "description": {
            "en": "Finance is about analyzing investments, risk, and financial decisions for companies or individuals, more analytical and market-focused than Accounting.",
            "km": "ហិរញ្ញវត្ថុគឺទាក់ទងនឹងការវិភាគការវិនិយោគ ហានិភ័យ និងការសម្រេចចិត្តផ្នែកហិរញ្ញវត្ថុ។",
        },
        "interests": ["business", "mathematics"],
        "strengths": ["mathematics", "problem_solving", "leadership"],
        "career": "finance",
        "budget_friendly": ["1000_2000", "2000_4000"],
        "careers": ["Financial Analyst", "Bank Officer", "Investment Associate", "Risk Analyst"],
        "skills": ["Financial analysis", "Investment basics", "Risk assessment", "Excel modeling"],
        "duration_years": 4,
    },
    {
        "id": "marketing",
        "name": {"en": "Marketing", "km": "ទីផ្សារ"},
        "tagline": {"en": "Tell stories that connect brands to people.", "km": "ប្រាប់រឿងរ៉ាវដែលភ្ជាប់ម៉ាកយីហោទៅកាន់មនុស្ស។"},
        "description": {
            "en": "Marketing blends creativity and strategy: understanding customers, building brands, and running campaigns across digital and traditional channels.",
            "km": "ទីផ្សារលាយបញ្ចូលគ្នារវាងភាពច្នៃប្រឌិត និងយុទ្ធសាស្ត្រ៖ ការយល់ដឹងអំពីអតិថិជន និងការកសាងម៉ាកយីហោ។",
        },
        "interests": ["business", "arts_design"],
        "strengths": ["communication", "creativity"],
        "career": "business",
        "budget_friendly": ["lt1000", "1000_2000"],
        "careers": ["Marketing Executive", "Social Media Manager", "Brand Coordinator", "Market Researcher"],
        "skills": ["Branding", "Digital marketing", "Market research", "Content creation"],
        "duration_years": 4,
    },
    {
        "id": "civil-engineering",
        "name": {"en": "Civil Engineering", "km": "វិស្វកម្មសំណង់"},
        "tagline": {"en": "Design the roads, bridges, and buildings of Cambodia.", "km": "រចនាផ្លូវ ស្ពាន និងអគារនានានៅកម្ពុជា។"},
        "description": {
            "en": "Civil Engineering applies math and physics to design and build infrastructure, from roads and bridges to buildings and water systems.",
            "km": "វិស្វកម្មសំណង់អនុវត្តគណិតវិទ្យា និងរូបវិទ្យា ដើម្បីរចនា និងសាងសង់ហេដ្ឋារចនាសម្ព័ន្ធ។",
        },
        "interests": ["mathematics", "science"],
        "strengths": ["mathematics", "problem_solving"],
        "career": "engineering",
        "budget_friendly": ["1000_2000", "2000_4000"],
        "careers": ["Civil Engineer", "Site Supervisor", "Structural Designer", "Project Engineer"],
        "skills": ["Structural design", "Construction materials", "Technical drawing", "Project planning"],
        "duration_years": 5,
    },
    {
        "id": "graphic-design",
        "name": {"en": "Graphic Design", "km": "ការរចនាក្រាហ្វិក"},
        "tagline": {"en": "Turn ideas into visuals people remember.", "km": "ប្រែក្លាយគំនិតទៅជារូបភាពដែលមនុស្សចងចាំ។"},
        "description": {
            "en": "Graphic Design teaches visual communication, typography, branding, and digital design tools, for anyone who thinks in images and layouts.",
            "km": "ការរចនាក្រាហ្វិកបង្រៀនអំពីទំនាក់ទំនងតាមរូបភាព តួអក្សរ ម៉ាកយីហោ និងឧបករណ៍រចនាឌីជីថល។",
        },
        "interests": ["arts_design"],
        "strengths": ["creativity", "writing"],
        "career": "design",
        "budget_friendly": ["1000_2000", "2000_4000", "4000_plus"],
        "careers": ["Graphic Designer", "UI/UX Designer", "Illustrator", "Art Director"],
        "skills": ["Visual design", "Typography", "Design software", "Branding"],
        "duration_years": 4,
    },
]

UNIVERSITIES = [
    {
        "id": "rupp",
        "name": {"en": "Royal University of Phnom Penh", "km": "សាកលវិទ្យាល័យភូមិន្ទភ្នំពេញ"},
        "location": "phnom_penh",
        "description": {
            "en": "Cambodia's oldest and largest public university, offering a wide range of science, IT, and social science programs.",
            "km": "សាកលវិទ្យាល័យសាធារណៈចាស់ និងធំបំផុតរបស់កម្ពុជា ផ្តល់កម្មវិធីសិក្សាផ្នែកវិទ្យាសាស្ត្រ បច្ចេកវិទ្យា និងសង្គមវិទ្យាជាច្រើន។",
        },
        "majors": ["computer-science", "information-technology", "business-administration", "accounting"],
        "tuition_per_year": 900,
        "scholarship_max_percent": 30,
        "admission_requirements": [
            {"en": "Grade 12 certificate", "km": "សញ្ញាបត្រថ្នាក់ទី១២"},
            {"en": "Entrance exam or interview", "km": "ការប្រឡងចូល ឬសម្ភាសន៍"},
            {"en": "Basic English proficiency", "km": "ចំណេះដឹងភាសាអង់គ្លេសកម្រិតមូលដ្ឋាន"},
        ],
        "contact": {"phone": "+855 23 883 640", "email": "info@rupp.edu.kh", "website": "www.rupp.edu.kh"},
    },
    {
        "id": "itc",
        "name": {"en": "Institute of Technology of Cambodia", "km": "វិទ្យាស្ថានបច្ចេកវិទ្យាកម្ពុជា"},
        "location": "phnom_penh",
        "description": {
            "en": "A leading public engineering and technology institute, known for strong math and science preparation.",
            "km": "វិទ្យាស្ថានវិស្វកម្ម និងបច្ចេកវិទ្យាសាធារណៈឈានមុខគេ ដែលល្បីល្បាញផ្នែកគណិតវិទ្យា និងវិទ្យាសាស្ត្រ។",
        },
        "majors": ["civil-engineering", "computer-science", "software-engineering", "data-science"],
        "tuition_per_year": "650-800",
        "scholarship_max_percent": 40,
        "admission_requirements": [
            {"en": "Grade 12 certificate", "km": "សញ្ញាបត្រថ្នាក់ទី១២"},
            {"en": "Entrance exam (Math & Physics)", "km": "ការប្រឡងចូល (គណិតវិទ្យា និងរូបវិទ្យា)"},
            {"en": "Interview", "km": "សម្ភាសន៍"},
        ],
        "contact": {"phone": "+855 23 880 379", "email": "admissions@itc.edu.kh", "website": "www.itc.edu.kh"},
    },
    {
        "id": "num",
        "name": {"en": "National University of Management", "km": "សាកលវិទ្យាល័យជាតិគ្រប់គ្រង"},
        "location": "phnom_penh",
        "description": {
            "en": "A public university focused on business, management, and finance, with strong ties to employers.",
            "km": "សាកលវិទ្យាល័យសាធារណៈផ្តោតលើធុរកិច្ច ការគ្រប់គ្រង និងហិរញ្ញវត្ថុ។",
        },
        "majors": ["business-administration", "finance", "accounting", "marketing"],
        "tuition_per_year": 850,
        "scholarship_max_percent": 25,
        "admission_requirements": [
            {"en": "Grade 12 certificate", "km": "សញ្ញាបត្រថ្នាក់ទី១២"},
            {"en": "Entrance interview", "km": "សម្ភាសន៍ចូលរៀន"},
        ],
        "contact": {"phone": "+855 23 884 613", "email": "info@num.edu.kh", "website": "www.num.edu.kh"},
    },
    {
        "id": "paragon",
        "name": {"en": "Paragon International University", "km": "សាកលវិទ្យាល័យអន្តរជាតិប៉ារ៉ាហ្គិន"},
        "location": "phnom_penh",
        "description": {
            "en": "A private university with an international curriculum, smaller class sizes, and strong tech and business programs.",
            "km": "សាកលវិទ្យាល័យឯកជនដែលមានកម្មវិធីសិក្សាអន្តរជាតិ ថ្នាក់រៀនតូច និងកម្មវិធីបច្ចេកវិទ្យា-ធុរកិច្ចខ្លាំង។",
        },
        "majors": ["computer-science", "software-engineering", "business-administration", "data-science"],
        "tuition_per_year": 3600,
        "scholarship_max_percent": 70,
        "admission_requirements": [
            {"en": "Grade 12 certificate", "km": "សញ្ញាបត្រថ្នាក់ទី១២"},
            {"en": "English proficiency test", "km": "ការប្រឡងភាសាអង់គ្លេស"},
            {"en": "Application essay", "km": "អត្ថបទសុំចូលរៀន"},
        ],
        "contact": {"phone": "+855 23 990 024", "email": "admissions@paragoniu.edu.kh", "website": "www.paragoniu.edu.kh"},
    },
    {
        "id": "puthisastra",
        "name": {"en": "University of Puthisastra", "km": "សាកលវិទ្យាល័យពុទ្ធិសាស្ត្រ"},
        "location": "phnom_penh",
        "description": {
            "en": "A private university known for health sciences, IT, business, and creative programs with modern facilities.",
            "km": "សាកលវិទ្យាល័យឯកជនល្បីល្បាញផ្នែកវិទ្យាសាស្ត្រសុខភាព បច្ចេកវិទ្យា ធុរកិច្ច និងកម្មវិធីច្នៃប្រឌិត។",
        },
        "majors": ["information-technology", "business-administration", "graphic-design"],
        "tuition_per_year": 2400,
        "scholarship_max_percent": 35,
        "admission_requirements": [
            {"en": "Grade 12 certificate", "km": "សញ្ញាបត្រថ្នាក់ទី១២"},
            {"en": "Entrance exam", "km": "ការប្រឡងចូល"},
            {"en": "Portfolio (for Design)", "km": "សំណុំកិច្ចការ (សម្រាប់ជំនាញរចនា)"},
        ],
        "contact": {"phone": "+855 23 999 824", "email": "info@puthisastra.edu.kh", "website": "www.puthisastra.edu.kh"},
    },
    {
        "id": "norton",
        "name": {"en": "Norton University", "km": "សាកលវិទ្យាល័យន័រតុន"},
        "location": "phnom_penh",
        "description": {
            "en": "A private university with a long-running business school and flexible evening class options.",
            "km": "សាកលវិទ្យាល័យឯកជនដែលមានសាលាធុរកិច្ចយូរឆ្នាំ និងម៉ោងសិក្សាដែលអាចបត់បែនបាន។",
        },
        "majors": ["business-administration", "finance", "accounting", "marketing", "information-technology"],
        "tuition_per_year": 950,
        "scholarship_max_percent": 20,
        "admission_requirements": [
            {"en": "Grade 12 certificate", "km": "សញ្ញាបត្រថ្នាក់ទី១២"},
            {"en": "Application form", "km": "ទម្រង់ពាក្យសុំចូលរៀន"},
        ],
        "contact": {"phone": "+855 23 883 949", "email": "info@norton.edu.kh", "website": "www.norton.edu.kh"},
    },
    {
        "id": "ubb",
        "name": {"en": "University of Battambang", "km": "សាកលវិទ្យាល័យបាត់ដំបង"},
        "location": "battambang",
        "description": {
            "en": "A public university serving Cambodia's northwest, with affordable tuition and strong regional ties.",
            "km": "សាកលវិទ្យាល័យសាធារណៈបម្រើតំបន់ភាគពាយព្យនៃកម្ពុជា ដោយមានថ្លៃសិក្សាសមរម្យ។",
        },
        "majors": ["business-administration", "accounting", "civil-engineering", "information-technology"],
        "tuition_per_year": 650,
        "scholarship_max_percent": 20,
        "admission_requirements": [
            {"en": "Grade 12 certificate", "km": "សញ្ញាបត្រថ្នាក់ទី១២"},
            {"en": "Local entrance exam", "km": "ការប្រឡងចូលថ្នាក់តំបន់"},
        ],
        "contact": {"phone": "+855 53 730 344", "email": "info@ubb.edu.kh", "website": "www.ubb.edu.kh"},
    },
    {
        "id": "bbu",
        "name": {"en": "Build Bright University", "km": "សាកលវិទ្យាល័យប៊ីលប្រាយថ៍"},
        "location": "siem_reap",
        "description": {
            "en": "A private university with multiple campuses, offering practical business, IT, and engineering programs.",
            "km": "សាកលវិទ្យាល័យឯកជនដែលមានសាខាច្រើន ផ្តល់កម្មវិធីធុរកិច្ច បច្ចេកវិទ្យា និងវិស្វកម្មជាក់ស្តែង។",
        },
        "majors": ["business-administration", "information-technology", "marketing", "civil-engineering"],
        "tuition_per_year": 900,
        "scholarship_max_percent": 30,
        "admission_requirements": [
            {"en": "Grade 12 certificate", "km": "សញ្ញាបត្រថ្នាក់ទី១២"},
            {"en": "Application interview", "km": "សម្ភាសន៍ពាក្យសុំចូលរៀន"},
        ],
        "contact": {"phone": "+855 63 966 777", "email": "info@bbu.edu.kh", "website": "www.bbu.edu.kh"},
    },
]

SCHOLARSHIPS = [
    {"id": "sch-1", "name": {"en": "RUPP Merit Scholarship", "km": "អាហារូបករណ៍សមត្ថភាព RUPP"}, "university_id": "rupp", "coverage_percent": 30, "requirement": {"en": "Top scores on the national Grade 12 exam", "km": "ពិន្ទុខ្ពស់បំផុតលើការប្រឡងជាតិថ្នាក់ទី១២"}, "deadline": "June 30"},
    {"id": "sch-2", "name": {"en": "ITC STEM Excellence Scholarship", "km": "អាហារូបករណ៍ឧត្តមភាព STEM របស់ ITC"}, "university_id": "itc", "coverage_percent": 40, "requirement": {"en": "Strong Math & Physics entrance scores", "km": "ពិន្ទុប្រឡងចូលខ្ពស់លើគណិតវិទ្យា និងរូបវិទ្យា"}, "deadline": "July 15"},
    {"id": "sch-3", "name": {"en": "NUM Business Leaders Scholarship", "km": "អាហារូបករណ៍អ្នកដឹកនាំធុរកិច្ច NUM"}, "university_id": "num", "coverage_percent": 25, "requirement": {"en": "Leadership or extracurricular record", "km": "កំណត់ត្រាភាពជាអ្នកដឹកនាំ ឬសកម្មភាពក្រៅកម្មវិធីសិក្សា"}, "deadline": "August 1"},
    {"id": "sch-4", "name": {"en": "Paragon Presidential Scholarship", "km": "អាហារូបករណ៍ប្រធានាធិបតី Paragon"}, "university_id": "paragon", "coverage_percent": 70, "requirement": {"en": "Top 5% Grade 12 results", "km": "លទ្ធផលថ្នាក់ទី១២ក្នុងចំណោម ៥% កំពូល"}, "deadline": "May 31"},
    {"id": "sch-5", "name": {"en": "Puthisastra Creative Talent Award", "km": "រង្វាន់ទេពកោសល្យច្នៃប្រឌិត ពុទ្ធិសាស្ត្រ"}, "university_id": "puthisastra", "coverage_percent": 35, "requirement": {"en": "Design portfolio submission", "km": "ការដាក់ស្នើសំណុំកិច្ចការរចនា"}, "deadline": "July 20"},
    {"id": "sch-6", "name": {"en": "Norton Early Entry Scholarship", "km": "អាហារូបករណ៍ចូលរៀនមុនកាល N័រតុន"}, "university_id": "norton", "coverage_percent": 20, "requirement": {"en": "Apply before the early deadline", "km": "ដាក់ពាក្យមុនកាលកំណត់"}, "deadline": "April 30"},
    {"id": "sch-7", "name": {"en": "UBB Regional Access Scholarship", "km": "អាហារូបករណ៍ភូមិភាគ UBB"}, "university_id": "ubb", "coverage_percent": 20, "requirement": {"en": "Resident of Battambang province", "km": "អ្នកស្រុកខេត្តបាត់ដំបង"}, "deadline": "August 10"},
    {"id": "sch-8", "name": {"en": "Build Bright Siem Reap Scholarship", "km": "អាហារូបករណ៍សៀមរាប Build Bright"}, "university_id": "bbu", "coverage_percent": 30, "requirement": {"en": "Resident of Siem Reap province", "km": "អ្នកស្រុកខេត្តសៀមរាប"}, "deadline": "August 10"},
    {"id": "sch-9", "name": {"en": "National Science & Tech Scholarship", "km": "អាហារូបករណ៍វិទ្យាសាស្ត្រ-បច្ចេកវិទ្យាថ្នាក់ជាតិ"}, "university_id": "itc", "coverage_percent": 60, "requirement": {"en": "Top national exam scorers in STEM", "km": "អ្នកទទួលពិន្ទុខ្ពស់បំផុតថ្នាក់ជាតិផ្នែក STEM"}, "deadline": "June 15"},
    {"id": "sch-10", "name": {"en": "Women in Tech Scholarship", "km": "អាហារូបករណ៍នារីក្នុងវិស័យបច្ចេកវិទ្យា"}, "university_id": "paragon", "coverage_percent": 50, "requirement": {"en": "Female students entering CS, IT or Data Science", "km": "សិស្សនារីចូលរៀនផ្នែក CS, IT ឬវិទ្យាសាស្ត្រទិន្នន័យ"}, "deadline": "July 1"},
]


def get_all_majors() -> list[dict]:
    return MAJORS


def get_major(major_id: str) -> dict | None:
    return next((m for m in MAJORS if m["id"] == major_id), None)


def get_all_universities() -> list[dict]:
    return UNIVERSITIES


def get_university(university_id: str) -> dict | None:
    return next((u for u in UNIVERSITIES if u["id"] == university_id), None)


def get_all_scholarships() -> list[dict]:
    return SCHOLARSHIPS
