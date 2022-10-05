import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

@ApiTags('users')
@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @ApiOkResponse({ type: User, isArray: true })
    @ApiQuery({name: 'name', required: false})
    @Get()
    async getUsers(@Query('name') name: string): Promise<User[]> {
        return this.usersService.findAll(name);
    }

    @ApiCreatedResponse({ type: User })
    @Post() 
    async createUser(@Body() body: CreateUserDto): Promise<User> {
        return this.usersService.createUser(body);
    }
}
