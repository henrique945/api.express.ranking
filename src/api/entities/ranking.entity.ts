//#region Imports

import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

//#endregion

@Entity('ranking')
export class RankingEntity {

	//#region Constructors

	constructor(partial: Partial<RankingEntity>) {

		Object.assign(this, partial);
	}

	//#endregion

	//#region Properties

	/**
	 * O id do ranking
	 */
	@PrimaryGeneratedColumn('uuid')
	public id: number;

	/**
	 * O nome da pessoa do ranking
	 */
	@Column({ nullable: false })
	public name: string;

	/**
	 * A quantidade de pontos que a pessoa fez
	 */
	@Column({ nullable: false })
	points: number;

	//#endregion

}
