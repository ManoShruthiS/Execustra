"""Task Generator Agent — Produces optimized daily micro-actions."""

from datetime import date
import uuid


class TaskGeneratorAgent:
    """AI agent that generates personalized daily tasks."""

    def generate_tasks(
        self,
        goal: str,
        consistency_level: str,
        completion_rate: float,
        current_phase: str = "Foundation",
    ) -> list[dict]:
        """Generate 1-3 daily tasks based on user profile and performance."""

        # Determine task count based on consistency
        task_count = {
            "low": 1,
            "medium": 2,
            "high": 3,
        }.get(consistency_level, 2)

        # Adjust based on recent completion rate
        if completion_rate < 40:
            task_count = max(1, task_count - 1)
        elif completion_rate > 85:
            task_count = min(3, task_count + 1)

        # Generate tasks
        # TODO: Integrate with OpenRouter/HuggingFace for AI-generated tasks
        tasks = []
        templates = self._get_templates(goal, task_count)

        for i, template in enumerate(templates[:task_count]):
            tasks.append({
                "id": str(uuid.uuid4()),
                "task_text": template["text"],
                "duration": template["duration"],
                "category": template["category"],
                "date": date.today().isoformat(),
                "status": "pending",
            })

        return tasks

    def _get_templates(self, goal: str, count: int) -> list[dict]:
        """Get task templates for the goal."""
        base_tasks = [
            {"text": f"Practice core {goal} skill for 25 minutes", "duration": "25 min", "category": "skill"},
            {"text": "Study one new concept in your field", "duration": "20 min", "category": "learning"},
            {"text": "Write a brief reflection on your progress", "duration": "10 min", "category": "reflection"},
        ]
        return base_tasks[:count]
