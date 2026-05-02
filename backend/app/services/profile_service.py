"""Profile service — manages user profiles and behavioral data."""

from typing import Optional


class ProfileService:
    """Service for managing user profiles."""

    def __init__(self):
        self._profiles: dict[str, dict] = {}

    def create_profile(self, user_id: str, goal: str, blockers: list[str], consistency: str) -> dict:
        """Create a new user profile from onboarding data."""
        profile = {
            "user_id": user_id,
            "goal": goal,
            "consistency_level": consistency,
            "blockers": blockers,
            "task_completion_rate": 0.0,
            "consistency_score": 0.0,
            "identified_weaknesses": self._identify_weaknesses(blockers),
        }
        self._profiles[user_id] = profile
        return profile

    def get_profile(self, user_id: str) -> Optional[dict]:
        """Get user profile."""
        return self._profiles.get(user_id)

    def update_metrics(self, user_id: str, completion_rate: float, consistency_score: float):
        """Update user performance metrics."""
        profile = self._profiles.get(user_id)
        if profile:
            profile["task_completion_rate"] = completion_rate
            profile["consistency_score"] = consistency_score

    def _identify_weaknesses(self, blockers: list[str]) -> list[str]:
        """Map blockers to identified weakness categories."""
        weakness_map = {
            "Lack of clarity on what to do": "Direction",
            "Too many options / decision fatigue": "Decision Making",
            "Procrastination / low motivation": "Motivation",
            "No structured routine": "Structure",
            "Imposter syndrome": "Confidence",
            "Time management issues": "Time Management",
            "Burnout or overwhelm": "Energy Management",
        }
        return [weakness_map.get(b, "General") for b in blockers]
