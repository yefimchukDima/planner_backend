import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Delete,
  Param,
  ParseIntPipe,
  UsePipes,
  ValidationPipe,
  HttpCode,
  NotFoundException,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './entity/task.entity';

@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Get all tasks.
   * @returns {Promise<Task[]>} Array of tasks.
   */
  @Get()
  async findAll(): Promise<Task[]> {
    return this.tasksService.getAllTasks();
  }

  /**
   * Get a task by its ID.
   * @param {number} id - Task ID.
   * @returns {Promise<Task>} Task object.
   * @throws {NotFoundException} Throws an exception if task is not found.
   */
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number): Promise<Task> {
    const task = await this.tasksService.getTaskById(id);
    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }
    return task;
  }

  /**
   * Create a new task.
   * @param {CreateTaskDto} createTaskDto - Data Transfer Object for task creation.
   * @returns {Promise<Task>} Created task object.
   */
  @Post()
  @HttpCode(201)
  async create(@Body() createTaskDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(createTaskDto);
  }

  /**
   * Update a task by its ID.
   * @param {number} id - Task ID.
   * @param {CreateTaskDto} updateTaskDto - Data Transfer Object for task update.
   * @returns {Promise<Task>} Updated task object.
   */
  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateTaskDto: CreateTaskDto,
  ): Promise<Task> {
    return this.tasksService.updateTask(id, updateTaskDto);
  }

  /**
   * Remove a task by its ID.
   * @param {number} id - Task ID.
   * @throws {NotFoundException} Throws an exception if the task is not found.
   */
  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', ParseIntPipe) id: number): Promise<void> {
    await this.tasksService.deleteTask(id);
  }
}
