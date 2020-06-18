import { Entity, Column, PrimaryColumn, BaseEntity } from "typeorm";

@Entity()
export class Measurement extends BaseEntity {

    @Column()
    value: number;

    @PrimaryColumn()
    timestamp: Date;
}