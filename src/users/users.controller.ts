import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@ApiTags('users')
@Controller('api/users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: '查询用户列表' })
  @ApiQuery({ name: 'role', required: false, description: '角色筛选：ELDER / PROXY' })
  @ApiQuery({ name: 'page', required: false, description: '页码，默认 1' })
  @ApiQuery({ name: 'pageSize', required: false, description: '每页条数，默认 10' })
  @ApiResponse({ status: 200, description: '成功返回用户分页列表' })
  async findAll(
    @Query('role') role?: string,
    @Query('page') page?: string,
    @Query('pageSize') pageSize?: string,
  ) {
    return this.usersService.findAll(
      role,
      page ? parseInt(page, 10) : 1,
      pageSize ? parseInt(pageSize, 10) : 10,
    );
  }

  @Get(':id')
  @ApiOperation({ summary: '查询单个用户' })
  @ApiResponse({ status: 200, description: '成功返回用户信息' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async findOne(@Param('id') id: string) {
    return this.usersService.findOne(parseInt(id, 10));
  }

  @Post()
  @ApiOperation({ summary: '创建用户' })
  @ApiResponse({ status: 200, description: '成功创建用户' })
  async create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Patch(':id')
  @ApiOperation({ summary: '更新用户' })
  @ApiResponse({ status: 200, description: '成功更新用户' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(parseInt(id, 10), updateUserDto);
  }

  @Delete(':id')
  @ApiOperation({ summary: '删除用户' })
  @ApiResponse({ status: 200, description: '成功删除用户' })
  @ApiResponse({ status: 404, description: '用户不存在' })
  async remove(@Param('id') id: string) {
    return this.usersService.remove(parseInt(id, 10));
  }
}