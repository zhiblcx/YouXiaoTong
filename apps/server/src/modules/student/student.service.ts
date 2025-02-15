import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateStudentDto } from './dto/create-student.dto';

@Injectable()
export class StudentService {
  constructor(private readonly prisma: PrismaService) {}
  async getStudentList() {
    return await this.prisma.student.findMany();
  }

  async getOrderList(userId: number) {
    return await this.prisma.order.findMany({
      where: { studentId: userId },
    });
  }

  async updateStudent(id: number, updateStudentDto: CreateStudentDto) {
    return await this.prisma.student.update({
      where: { id },
      data: {
        name: updateStudentDto.name,
        age: updateStudentDto.age,
        sex: updateStudentDto.sex,
        dormitory: updateStudentDto.dormitory,
      },
    });
  }

  async addStudent(createStudentDto: CreateStudentDto) {
    return await this.prisma.student.create({
      data: {
        name: createStudentDto.name,
        age: createStudentDto.age,
        sex: createStudentDto.sex,
        dormitory: createStudentDto.dormitory,
        password: '123456',
      },
    });
  }

  async deleteStudent(id: number) {
    return await this.prisma.student.delete({
      where: {
        id: id,
      },
    });
  }
}
