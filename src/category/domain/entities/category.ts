import UniqueEntityId from '../../../@seedwork/domain/value-objects/unique-entity-id.vo';
import Entity from '../../../@seedwork/domain/entity/entity';
import ValidatorRules from '../../../@seedwork/validators/validator-rules';

export type CategoryProperties = {
    name: string;
    description?: string;
    is_active?: boolean;
    created_at?: Date;
}

export class Category extends Entity<CategoryProperties> {

    constructor(readonly props: CategoryProperties, id?: UniqueEntityId) {
        Category.validate(props);
        super(props, id);
        this.description = this.props.description;
        this.is_active = this.props.is_active;
        this.props.created_at = this.props.created_at ?? new Date();
    }

    update(name: string, description: string): void {   
        Category.validate({name, description});
        this.name = name;
        this.description = description;
    }

    static validate(props: Omit<CategoryProperties, 'created_at'>){
        ValidatorRules.values(props.name, 'name').required().string().maxLength(255);
        ValidatorRules.values(props.description, 'description').string();
        ValidatorRules.values(props.is_active, 'is_active').boolean();
    }

    activate() {
        this.props.is_active = true;
    }

    deactivate() {
        this.props.is_active = false;
    }
  
    get name(): string {
        return this.props.name
    }

    private set name(value){
        this.props.name = value;
    }

    get description(): string | undefined {
        return this.props.description;
    }

    private set description(value) {
        this.props.description = value ?? null;
    }

    get is_active(): boolean | undefined {
        return this.props.is_active;
    }

    private set is_active(value: boolean) {
        this.props.is_active = value ?? true;
    }

    get created_at(): Date | undefined {
        return this.props.created_at;
    }
}


const category = new Category({ name: 'test' });
const obj = category.toJSON();
