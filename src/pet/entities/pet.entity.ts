import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('pets')
export class Pet {
    @PrimaryGeneratedColumn('uuid')
    id: string;
    @Column()
    name: string;
    @Column()
    species: string;
    @Column()
    breed: string;
    @Column({type: 'date', name: 'birth_date'})
    birthDate: Date;
    @Column({name: 'owner_id', type: 'uuid', nullable: true})
    ownerId: string;
    @Column({nullable: true})
    sex?: 'male' | 'female';
    @CreateDateColumn({type: 'date', name: 'created_at'})
    createdAt: Date;
    @UpdateDateColumn({type: 'date', name: 'updated_at'})
    updatedAt: Date;
}
