import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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
    @Column({name: 'media_id', type: 'uuid', nullable: true})
    mediaId?: string;
    @Column({nullable: true})
    sex?: 'male' | 'female';
    @Column({ type: 'varchar', length: 20, nullable: true })
    size?: 'small' | 'medium' | 'large';
    @Column({
        type: 'numeric',
        precision: 6,
        scale: 2,
        nullable: true,
        transformer: {
            to: (value?: number) => value,
            from: (value: string | null) =>
                value === null || value === undefined ? null : Number(value),
        },
    })
    weight?: number;
    @CreateDateColumn({type: 'date', name: 'created_at'})
    createdAt: Date;
    @UpdateDateColumn({type: 'date', name: 'updated_at'})
    updatedAt: Date;
    @DeleteDateColumn({type: 'timestamp', name: 'deleted_at', nullable: true})
    deletedAt?: Date;
}
