"""Task service — handles daily task generation and management."""

from datetime import date, datetime, timedelta
from typing import Optional
import uuid


# Task templates organized by goal
TASK_TEMPLATES = {
    "AI Engineer": [
        {"text": "Complete 1 Python coding challenge", "duration": "25 min", "category": "skill"},
        {"text": "Study 1 ML concept or algorithm", "duration": "30 min", "category": "learning"},
        {"text": "Document your key learning in notes", "duration": "10 min", "category": "reflection"},
    ],
    "Software Developer": [
        {"text": "Build or fix one feature in your project", "duration": "30 min", "category": "skill"},
        {"text": "Watch 1 system design tutorial", "duration": "20 min", "category": "learning"},
        {"text": "Write down what you learned today", "duration": "10 min", "category": "reflection"},
    ],
    "Data Scientist": [
        {"text": "Explore or clean a dataset", "duration": "25 min", "category": "skill"},
        {"text": "Study 1 statistical method", "duration": "20 min", "category": "learning"},
        {"text": "Summarize your key insight", "duration": "10 min", "category": "reflection"},
    ],
    "default": [
        {"text": "Work on your most important skill for 25 min", "duration": "25 min", "category": "skill"},
        {"text": "Learn something new in your field", "duration": "20 min", "category": "learning"},
        {"text": "Reflect on today's progress", "duration": "10 min", "category": "reflection"},
    ],
}


class TaskService:
    """Service for managing daily tasks."""

    def __init__(self):
        self._tasks_db: dict[str, list[dict]] = {}

    def get_daily_tasks(self, user_id: str, target_date: date) -> dict:
        """Get or generate tasks for a specific date."""
        key = f"{user_id}:{target_date.isoformat()}"

        if key not in self._tasks_db:
            # Generate new tasks
            tasks = self._generate_tasks(user_id, target_date)
            self._tasks_db[key] = tasks

        tasks = self._tasks_db[key]
        completed = sum(1 for t in tasks if t["status"] == "completed")
        rate = (completed / len(tasks) * 100) if tasks else 0

        return {
            "date": target_date,
            "tasks": tasks,
            "completion_rate": round(rate, 1),
        }

    def _generate_tasks(self, user_id: str, target_date: date) -> list[dict]:
        """Generate daily tasks based on user profile."""
        # TODO: Use AI agent and user profile for personalized generation
        templates = TASK_TEMPLATES.get("default", TASK_TEMPLATES["default"])

        tasks = []
        for template in templates:
            tasks.append({
                "id": str(uuid.uuid4()),
                "user_id": user_id,
                "task_text": template["text"],
                "date": target_date,
                "status": "pending",
                "duration": template["duration"],
                "category": template["category"],
                "completed_at": None,
            })

        return tasks

    def update_task_status(self, user_id: str, task_id: str, status: str) -> Optional[dict]:
        """Update a task's status."""
        today = date.today()
        key = f"{user_id}:{today.isoformat()}"
        tasks = self._tasks_db.get(key, [])

        for task in tasks:
            if task["id"] == task_id:
                task["status"] = status
                if status == "completed":
                    task["completed_at"] = datetime.utcnow()
                return task
        return None

    def get_history(self, user_id: str, days: int = 7) -> list[dict]:
        """Get task history for past N days."""
        history = []
        today = date.today()

        for i in range(days):
            d = today - timedelta(days=i)
            key = f"{user_id}:{d.isoformat()}"
            tasks = self._tasks_db.get(key, [])
            if tasks:
                completed = sum(1 for t in tasks if t["status"] == "completed")
                history.append({
                    "date": d,
                    "total": len(tasks),
                    "completed": completed,
                    "rate": round(completed / len(tasks) * 100, 1) if tasks else 0,
                })

        return history
