import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity()
export class Tasks{
    @PrimaryGeneratedColumn()
    id: number;
    
    @Column({
        default: true
    })
    title: string;
    
    @Column({
        default: true
    })
    description: string;
    
    @Column({
        default: false
    })
    finished: boolean;

    @CreateDateColumn()
    create_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}