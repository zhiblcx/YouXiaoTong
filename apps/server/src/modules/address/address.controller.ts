import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Request,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOperation,
  ApiParam,
  ApiTags,
} from '@nestjs/swagger';
import { AddressService } from './address.service';
import { CreateAddressDto } from './dto/create-address.dto';

@Controller('address')
@ApiTags('地址管理')
@ApiBearerAuth()
export class AddressController {
  constructor(private readonly addressService: AddressService) {}
  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取地址列表' })
  @Get()
  async getAddressList(@Request() req) {
    return this.addressService.getAddressList(req.user.userId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '获取指定地址' })
  @Get(':id')
  async getAddressById(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.getAddressById(id);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改地址状态信息' })
  @Put('/status/:id')
  async updateAddressStatus(
    @Request() req,
    @Param('id', ParseIntPipe) id: number,
    @Query('status', ParseBoolPipe) status: boolean,
  ) {
    return this.addressService.updateAddressStatus(
      Number(req.user.userId),
      id,
      status,
    );
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '修改地址信息' })
  @Put(':id')
  async updateAddress(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateAddressDto: CreateAddressDto,
  ) {
    return this.addressService.updateAddress(id, updateAddressDto);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '添加地址' })
  @Post()
  async addAddress(@Request() req, @Body() createAddressDto: CreateAddressDto) {
    return this.addressService.addAddress(createAddressDto, req.user.userId);
  }

  @HttpCode(HttpStatus.OK)
  @ApiOperation({ summary: '删除地址' })
  @ApiParam({
    name: 'id',
    type: Number,
    example: 1,
    description: '地址id',
  })
  @Delete(':id')
  async deleteAddress(@Param('id', ParseIntPipe) id: number) {
    return this.addressService.deleteAddress(id);
  }
}
