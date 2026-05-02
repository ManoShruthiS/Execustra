"""Planner Agent — Converts high-level goals into structured roadmaps."""


class PlannerAgent:
    """AI agent that converts user goals into structured learning/execution paths."""

    ROADMAPS = {
        "AI Engineer": {
            "path_name": "AI Engineering Path",
            "phases": [
                {"name": "Python Fundamentals", "duration": "2 weeks", "tasks": [
                    "Master Python data structures",
                    "Learn OOP concepts",
                    "Practice with coding challenges",
                ]},
                {"name": "Machine Learning Basics", "duration": "3 weeks", "tasks": [
                    "Study supervised learning algorithms",
                    "Implement linear regression from scratch",
                    "Learn scikit-learn basics",
                ]},
                {"name": "Deep Learning", "duration": "3 weeks", "tasks": [
                    "Understand neural network architecture",
                    "Build models with PyTorch/TensorFlow",
                    "Work on image classification project",
                ]},
                {"name": "Project Development", "duration": "4 weeks", "tasks": [
                    "Design end-to-end ML pipeline",
                    "Build a portfolio project",
                    "Deploy model as API",
                ]},
                {"name": "Interview Preparation", "duration": "2 weeks", "tasks": [
                    "Practice ML interview questions",
                    "Review system design for ML",
                    "Mock interviews",
                ]},
            ],
        },
        "Software Developer": {
            "path_name": "Software Development Path",
            "phases": [
                {"name": "Core Programming", "duration": "2 weeks", "tasks": [
                    "Master data structures & algorithms",
                    "Build CLI tools",
                    "Version control with Git",
                ]},
                {"name": "Web Development", "duration": "3 weeks", "tasks": [
                    "Learn React/frontend basics",
                    "Build REST APIs",
                    "Database design fundamentals",
                ]},
                {"name": "System Design", "duration": "2 weeks", "tasks": [
                    "Study scalability patterns",
                    "Learn caching and messaging",
                    "Design a complete system",
                ]},
                {"name": "Portfolio & Deploy", "duration": "3 weeks", "tasks": [
                    "Build 2 portfolio projects",
                    "Deploy to cloud",
                    "Write documentation",
                ]},
            ],
        },
    }

    def generate_roadmap(self, goal: str) -> dict:
        """Generate a structured roadmap for the given goal."""
        roadmap = self.ROADMAPS.get(goal)
        if not roadmap:
            return {
                "path_name": f"{goal} Path",
                "phases": [
                    {"name": "Foundation", "duration": "2 weeks", "tasks": [
                        "Research key skills needed",
                        "Set up learning environment",
                        "Find quality resources",
                    ]},
                    {"name": "Core Skills", "duration": "4 weeks", "tasks": [
                        "Practice fundamental skills daily",
                        "Build small projects",
                        "Join relevant communities",
                    ]},
                    {"name": "Advanced Practice", "duration": "4 weeks", "tasks": [
                        "Work on complex projects",
                        "Seek feedback from peers",
                        "Refine your approach",
                    ]},
                ],
            }
        return roadmap
