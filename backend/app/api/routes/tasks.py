"""Task management routes."""

from fastapi import APIRouter, Depends, HTTPException, status
from app.schemas.task import TaskResponse, TaskUpdate, DailyTasksResponse
from app.api.deps import get_current_user
from app.services.task_service import TaskService
from datetime import date

router = APIRouter(prefix="/tasks", tags=["Tasks"])

task_service = TaskService()


@router.get("/today", response_model=DailyTasksResponse)
async def get_today_tasks(current_user: dict = Depends(get_current_user)):
    """Get today's tasks for the current user."""
    user_id = current_user["sub"]
    return task_service.get_daily_tasks(user_id, date.today())


@router.patch("/{task_id}", response_model=TaskResponse)
async def update_task(
    task_id: str,
    update: TaskUpdate,
    current_user: dict = Depends(get_current_user),
):
    """Update a task's status (complete/skip)."""
    user_id = current_user["sub"]
    task = task_service.update_task_status(user_id, task_id, update.status)
    if not task:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Task not found")
    return task


@router.get("/history")
async def get_task_history(
    days: int = 7,
    current_user: dict = Depends(get_current_user),
):
    """Get task history for the past N days."""
    user_id = current_user["sub"]
    return task_service.get_history(user_id, days)
