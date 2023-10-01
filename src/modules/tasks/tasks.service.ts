import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task } from './entity/task.entity';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  /**
   * Get all tasks.
   * @returns {Promise<Task[]>} An array of tasks.
   */
  async getAllTasks(): Promise<Task[]> {
    return this.tasksRepository.find();
  }

  /**
   * Get a task by its ID.
   * @param {number} id - The ID of the task.
   * @returns {Promise<Task>} The task object.
   * @throws {NotFoundException} Throws an exception if the task is not found.
   */
  async getTaskById(id: number): Promise<Task> {
    const task = await this.tasksRepository.findOne({ where: { id: id } });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  /**
   * Create a new task.
   * @param {CreateTaskDto} createTaskDto - The DTO for creating a task.
   * @returns {Promise<Task>} The created task object.
   */
  async createTask(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  /**
   * Update a task by its ID.
   * @param {number} id - The ID of the task to update.
   * @param {CreateTaskDto} updateTaskDto - The DTO for updating the task.
   * @returns {Promise<Task>} The updated task object.
   * @throws {NotFoundException} Throws an exception if the task is not found.
   */
  async updateTask(id: number, updateTaskDto: CreateTaskDto): Promise<Task> {
    await this.getTaskById(id);
    await this.tasksRepository.update(id, updateTaskDto);
    return this.getTaskById(id);
  }

  /**
   * Delete a task by its ID.
   * @param {number} id - The ID of the task to delete.
   * @throws {NotFoundException} Throws an exception if the task is not found.
   */
  async deleteTask(id: number): Promise<void> {
    const result = await this.tasksRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
  }
}
