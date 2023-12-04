import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCatDto } from './dto/create-cat.dto';
import { UpdateCatDto } from './dto/update-cat.dto';
import { Cat } from './entities/cat.entity';

@Injectable()
export class CatsService {
  private cats: Cat[] = [
    { id: 1, name: 'Kitty', age: 1 },
    { id: 2, name: 'Luna', age: 2 },
    { id: 3, name: 'Sam', age: 3 },
  ];

  create(createCat: CreateCatDto) {
    const newCat = { id: Date.now(), ...createCat };
    this.cats.push(newCat);
    return newCat;
  }

  findAll() {
    return this.cats;
  }

  findOne(id: number) {
    const cat = this.cats.find((c) => c.id === id);
    if (!cat) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    return cat;
  }

  update(id: number, updateCat: UpdateCatDto) {
    const catIndex = this.cats.findIndex((c) => c.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.cats[catIndex] = { ...this.cats[catIndex], ...updateCat };
    return this.cats[catIndex];
  }

  remove(id: number) {
    const catIndex = this.cats.findIndex((c) => c.id === id);
    if (catIndex === -1) {
      throw new NotFoundException(`Cat with ID ${id} not found`);
    }
    this.cats.splice(catIndex, 1);
  }
}
