import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { Body, Controller, Get, NotFoundException, Param, ParseIntPipe, Post, Query } from '@nestjs/common';
import { ApiCreatedResponse, ApiNotFoundResponse, ApiOkResponse, ApiQuery, ApiTags } from '@nestjs/swagger';

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

    // @ApiOkResponse({ type: User })
    // @ApiNotFoundResponse()
    // @Get(':id')
    // getUsersByUsername(@Param('username') username: string): User {
    //     const user = this.usersService.findOne(username)

    //     if(!user) {
    //         throw new NotFoundException()
    //     }

    //     return user;
    // }

    @ApiCreatedResponse({ type: User })
    @Post() 
    async createUser(@Body() body: CreateUserDto): Promise<User> {
        return this.usersService.createUser(body);
    }
}
