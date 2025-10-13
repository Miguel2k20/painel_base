import { Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity("text_content")
export class TextContent {
    @PrimaryGeneratedColumn()
    id: number
    @Column({  type: "varchar", length: 255, nullable: false })
    slug: string
    @Column({  type: "varchar", length: 255, nullable: false })
    name: string
    @Column({  type: "varchar", length: 255, nullable: false })
    title: string
    @Column({  type: "varchar", length: 255, nullable: false })
    subtitle: string
    @Column({ type: "text", nullable: false })
    description: string
    @Column({ type: "varchar", length: 255, nullable: false })
    link: string
    @CreateDateColumn({ type: "timestamp" })
    created_at: Date;
    @UpdateDateColumn({ type: "timestamp" })
    updated_at: Date;
    @DeleteDateColumn({ type: "timestamp", nullable: true })
    deleted_at?: Date;
}
