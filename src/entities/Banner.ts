import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity("banners")
export class Banner {
    @PrimaryGeneratedColumn()
    id: number
    @Column({  type: "varchar", length: 255, nullable: false })
    title: string 
    @Column({  type: "varchar", length: 255, nullable: true })
    Subtitle: string  
    @Column({  type: "varchar", length: 255, nullable: true })
    Link: string  
    @Column({  type: "varchar", length: 255 })
    image: string  
    @Column({  type: "varchar", length: 255 })
    mobile_image: string  
    @Column({ type: "boolean", default: true })
    active: boolean
}
