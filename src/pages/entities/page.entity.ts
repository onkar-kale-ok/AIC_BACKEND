import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity()

export class Page {
    @PrimaryGeneratedColumn()
    page_id: number;
  
    @Column({ nullable: false })
    page_name: string;
  
    @Column({ nullable: true })
    page_type: string;

    @Column({ nullable: false })
    page_edition: string;

    @Column({ nullable: false })
    page_owner: string;

    @Column({ nullable: true })
    page_url: string;

    @Column({ nullable: true })
    page_seo: string;

    @Column({ nullable: true })
    page_status: string;

    @Column({ nullable: true })
    page_comment: string;

    @Column({ nullable: true })
    created_by: string;

    @Column({ nullable: true })
    updated_by: string;

    @CreateDateColumn()
    created_at: Date;
  
    @UpdateDateColumn()
    updated_at: Date;
      
}
