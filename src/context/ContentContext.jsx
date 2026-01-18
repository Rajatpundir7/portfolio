import { createContext, useContext, useState, useEffect } from 'react';

const ContentContext = createContext();

export const useContent = () => useContext(ContentContext);

const defaultContent = {
    hero: {
        name: "Rajat Pundir",
        title: "AI & Machine Learning Engineer",
        subtitle: "Third-year B.Tech student specializing in AI & ML with expertise in Deep Learning, Computer Vision, and Reinforcement Learning",
        introVideo: null
    },
    about: {
        photo: null,
        description: "Third-year B.Tech student specializing in AI & ML with a focus on Deep Learning, Computer Vision, and Reinforcement Learning. Proven track record in developing scalable AI solutions for agriculture and urban infrastructure. Experienced in full-stack AI deployment using AWS and MongoDB. National-level hackathon finalist and competitive programmer with 250+ LeetCode solutions (Rating 1590+).",
        contact: {
            phone: "+91-8923365987",
            email: "rajatpundir07@gmail.com",
            linkedin: "https://linkedin.com/in/rajat-pundir-b7556b298",
            github: "https://github.com/rajatpundir07",
            leetcode: "https://leetcode.com/rajatpundir07"
        }
    },
    skills: [
        {
            category: "Programming Languages",
            items: ["Python", "Java", "C++", "C", "JavaScript", "SQL"]
        },
        {
            category: "Machine Learning & AI",
            items: ["Deep Learning", "NLP", "Computer Vision", "GANs", "LSTMs", "Transformers", "RAG", "GenAI"]
        },
        {
            category: "Frameworks & Libraries",
            items: ["TensorFlow", "PyTorch", "Keras", "Scikit-learn", "OpenCV", "Flask", "Streamlit"]
        },
        {
            category: "Databases",
            items: ["MySQL", "PostgreSQL", "MongoDB"]
        },
        {
            category: "Cloud & DevOps",
            items: ["AWS (EC2, S3, Lambda)", "Docker", "Git", "CUDA", "Vercel", "Render"]
        },
        {
            category: "Core CS & Tools",
            items: ["DSA", "OOP", "DBMS", "OS", "CN", "SUMO", "Leaflet.js"]
        }
    ],
    projects: [
        {
            title: "Kidney Stone Detection using Deep Computer Vision Models",
            period: "May 2025 - June 2025",
            tech: "Python, TensorFlow, Keras",
            points: [
                "Benchmarked three CNN architectures, achieving 88.8% (ResNet18), 82.45% (EfficientNetB0), and 77% (Custom CNN).",
                "Processed and cleaned 6,000+ X-ray samples with augmentation and annotation correction to strengthen dataset reliability.",
                "Accelerated clinical diagnosis by ~40%, helping reduce time to medical review."
            ],
            github: "https://github.com/Rajatpundir7/Kidneystonedetector",
            live: null
        },
        {
            title: "AI-based Intelligent Traffic Light Management System",
            period: "July 2025 - Sept 2025",
            tech: "CV, GNN, DRL, SUMO",
            points: [
                "Analyzed 30+ real-time traffic streams via YOLO + DeepSORT for density estimation and tracking.",
                "Enhanced traffic throughput by ~28% and reduced queue length by ~33% during SUMO simulation testing.",
                "Improved emergency vehicle mobility by ~45% using dynamic signal prioritization."
            ],
            github: "https://github.com/rajatpundir07",
            live: null
        },
        {
            title: "KISAN.JI — AI-Powered Smart Agriculture Platform",
            period: "Sept 2025 - Dec 2025",
            tech: "CV, DL, GNN, MongoDB",
            points: [
                "Built a plant disease detection system for 45+ crops using 7 deep learning models trained on 300+ disease samples.",
                "Integrated real-time weather, mandi prices, and government scheme alerts into a unified farmer dashboard.",
                "Implemented 8+ language support, AI help assistant, and pesticide, fertilizer, and herbicide calculators.",
                "Designed a scalable backend on MongoDB Cloud and applied GNNs for early pest outbreak prediction."
            ],
            github: null,
            live: "https://kisanji-frontend.vercel.app/"
        },
        {
            title: "QuizEra — Java Quiz Hosting Platform",
            period: "2024",
            tech: "Java, Swing, MySQL",
            points: [
                "Supported 100+ parallel test entries using optimized JDBC and query execution.",
                "Automated evaluation eliminated ~85% manual scoring workload.",
                "Raised exam completion rate by ~30% using interactive test navigation features."
            ],
            github: "https://github.com/Rajatpundir7/QuizEra",
            live: null
        }
    ],
    achievements: [
        "🏆 Hackathon Finalist — Square Hack at IIT Delhi by Ashoka and Tale of HumanKind (Top 26 out of 700+ teams)",
        "🎯 Achieved 53.63 SMPE Score in Amazon ML Challenge 2025",
        "🌐 Built OB Infrasolution website serving 50+ users",
        "🥇 1st place in IEEE internal research paper presentation",
        "👥 Collaborated with 4–7 teammates across multiple hackathons, ensuring strong communication and project delivery",
        "💻 Solved 250+ LeetCode challenges with rating 1590+"
    ],
    certifications: [
        {
            name: "Generative AI and Large Language Models",
            issuer: "IBM",
            link: "https://drive.google.com/file/d/1_4-imZ19cWpaF4k0FiRWIHINc_A9IE5T/view?usp=sharing"
        },
        {
            name: "Foundation Models for NLP",
            issuer: "IBM",
            link: "https://drive.google.com/file/d/1tRv0lpa1NgrzPDT6x3ZthL2wTevy-Un4/view?usp=drive_link"
        },
        {
            name: "Cloud Practitioner",
            issuer: "AWS",
            link: "https://drive.google.com/file/d/1NgIDT2FPg_u3GMGAn22rOHsg2831jNMP/view?usp=drive_link"
        },
        {
            name: "Cloud Computing",
            issuer: "NPTEL",
            link: "https://drive.google.com/file/d/1pdbW-dgImUBej2bBgIbxrWN8F8LbHLBo/view?usp=drive_link"
        },
        {
            name: "Deep Learning",
            issuer: "Scaler",
            link: "https://drive.google.com/file/d/1y5qJPn3HgiWNdSRa6By-JfXdjZyhnG1c/view?usp=drive_link"
        }
    ],
    education: [
        {
            degree: "B.Tech in Computer Science (AI & ML)",
            institution: "Graphic Era Hill University",
            period: "2023 - 2027",
            score: "CGPA: 8.50/10"
        },
        {
            degree: "Intermediate (CBSE)",
            institution: "The Doon Valley Public School",
            period: "2022 - 2023",
            score: "Percentage: 80.6%"
        },
        {
            degree: "High School (CBSE)",
            institution: "R.K. Public School",
            period: "2020 - 2021",
            score: "Percentage: 79%"
        }
    ],
    peseWeeks: [
        {
            id: 1,
            week: 1,
            title: "Introduction to PESE",
            description: "Overview of the Physical Education and Sports Education curriculum, goals for the semester, and introduction to various sports activities.",
            video: null
        }
    ],
    assignments: [
        {
            id: 1,
            title: "Assignment 1",
            description: "Details about assignment 1",
            image: null,
            link: null
        },
        {
            id: 2,
            title: "Assignment 2",
            description: "Details about assignment 2",
            image: null,
            link: null
        },
        {
            id: 3,
            title: "Assignment 3",
            description: "Details about assignment 3",
            image: null,
            link: null
        },
        {
            id: 4,
            title: "Assignment 4",
            description: "Details about assignment 4",
            image: null,
            link: null
        },
        {
            id: 5,
            title: "Assignment 5",
            description: "Details about assignment 5",
            image: null,
            link: null
        }
    ],
    weeklyLearning: [
        {
            id: 1,
            week: 1,
            title: "Week 1 Learning",
            content: "Summary of what was learned in week 1..."
        }
    ]
};

export const ContentProvider = ({ children }) => {
    const [content, setContent] = useState(() => {
        // Clear old localStorage data to use new defaults
        localStorage.removeItem('portfolio_content');
        return defaultContent;
    });

    useEffect(() => {
        localStorage.setItem('portfolio_content', JSON.stringify(content));
    }, [content]);

    const updateContent = (section, data) => {
        setContent(prev => ({
            ...prev,
            [section]: typeof data === 'function' ? data(prev[section]) : data
        }));
    };

    const updateNestedContent = (section, key, value) => {
        setContent(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [key]: value
            }
        }));
    };

    const addPeseWeek = (weekData) => {
        setContent(prev => ({
            ...prev,
            peseWeeks: [...prev.peseWeeks, {
                ...weekData,
                id: Date.now(),
                week: prev.peseWeeks.length + 1
            }]
        }));
    };

    const updatePeseWeek = (id, data) => {
        setContent(prev => ({
            ...prev,
            peseWeeks: prev.peseWeeks.map(week =>
                week.id === id ? { ...week, ...data } : week
            )
        }));
    };

    const deletePeseWeek = (id) => {
        setContent(prev => ({
            ...prev,
            peseWeeks: prev.peseWeeks.filter(week => week.id !== id)
        }));
    };

    const updateAssignment = (id, data) => {
        setContent(prev => ({
            ...prev,
            assignments: prev.assignments.map(assignment =>
                assignment.id === id ? { ...assignment, ...data } : assignment
            )
        }));
    };

    const addWeeklyLearning = (learningData) => {
        setContent(prev => ({
            ...prev,
            weeklyLearning: [...prev.weeklyLearning, {
                ...learningData,
                id: Date.now(),
                week: prev.weeklyLearning.length + 1
            }]
        }));
    };

    const updateWeeklyLearning = (id, data) => {
        setContent(prev => ({
            ...prev,
            weeklyLearning: prev.weeklyLearning.map(learning =>
                learning.id === id ? { ...learning, ...data } : learning
            )
        }));
    };

    const deleteWeeklyLearning = (id) => {
        setContent(prev => ({
            ...prev,
            weeklyLearning: prev.weeklyLearning.filter(learning => learning.id !== id)
        }));
    };

    const resetToDefault = () => {
        setContent(defaultContent);
        localStorage.removeItem('portfolio_content');
    };

    return (
        <ContentContext.Provider value={{
            content,
            updateContent,
            updateNestedContent,
            addPeseWeek,
            updatePeseWeek,
            deletePeseWeek,
            updateAssignment,
            addWeeklyLearning,
            updateWeeklyLearning,
            deleteWeeklyLearning,
            resetToDefault
        }}>
            {children}
        </ContentContext.Provider>
    );
};
