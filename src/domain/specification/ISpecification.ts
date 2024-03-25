export interface ISpecification<T> {
    isSatisfiedBy(t: T): boolean;
    and(other: ISpecification<T>): ISpecification<T>;
}

export abstract class AbstractSpecification<T> implements ISpecification<T> {
	abstract isSatisfiedBy(t: T): boolean;

	and(other: ISpecification<T>): ISpecification<T> {
		return new AndSpecification(this, other);
	}
}

export class AndSpecification<T> extends AbstractSpecification<T> {
	private left: ISpecification<T>;
	private right: ISpecification<T>;
	
	constructor (left: ISpecification<T>, right: ISpecification<T>) {
		super();
		this.left = left;
		this.right = right;
	}
	
	isSatisfiedBy(t: T): boolean {
		return this.left.isSatisfiedBy(t) && this.right.isSatisfiedBy(t);
	}

}