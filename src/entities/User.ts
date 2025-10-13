import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("users")
export class User {
    @PrimaryGeneratedColumn()
    id: number;
    @Column({  type: "varchar", length: 255 })
    name: string;
    @Column({  type: "varchar", length: 255, unique: true })
    email: string;
    @Column({  type: "varchar", length: 255 })
    password: string;
    @Column({ type: "boolean", default: true })
    active: boolean
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at?: Date;
}