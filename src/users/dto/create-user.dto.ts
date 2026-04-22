import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsNumber, IsIn } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @ApiProperty({ description: '用户姓名', example: '张大爷' })
  @IsString()
  name: string;

  @ApiPropertyOptional({ description: '手机号码', example: '13800138001' })
  @IsOptional()
  @IsString()
  phone?: string;

  @ApiPropertyOptional({ description: '年龄', example: 72 })
  @IsOptional()
  @IsNumber()
  age?: number;

  @ApiPropertyOptional({
    description: '角色：ELDER（老人）/ PROXY（代点人）',
    example: 'ELDER',
    enum: UserRole,
    default: UserRole.ELDER,
  })
  @IsOptional()
  @IsIn(['ELDER', 'PROXY'])
  role?: UserRole;
}
