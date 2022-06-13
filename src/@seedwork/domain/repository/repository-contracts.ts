import Entity from "../entity/entity";
import UniqueEntityId from "../value-objects/unique-entity-id.vo";

export interface RepositoryInterface<E extends Entity> {
    insert(entity: E): Promise<void>;
    findById(id: string | UniqueEntityId): Promise<E>;
    findAll(): Promise<E[]>;
    update(entity: E): Promise<void>;
    delete(id: string | UniqueEntityId): Promise<void>;
}

export type SortDirection = "asc" | "desc";

export type SearchProps<Filter = string> = {
    page?: number | null;
    per_page?: number | null;
    sort?: string | null;
    sort_dir?: SortDirection | null;
    filter?: Filter | null;
}

export class SearchParams {
    protected _page: number;
    protected _per_page: number = 15;
    protected _sort: string | null;
    protected _sort_dir: SortDirection | null;
    protected _filter: string | null;

    constructor(props: SearchProps = {}){
        this.page = props.page;
        this.per_page = props.per_page;
        this.sort = props.sort;
        this.sort_dir = props.sort_dir;
        this.filter = props.filter;
    }

    get page(): number {
        return this.page;
    }

    private set page(value: number){
        let _page = +value;
        if (Number.isNaN(_page) || _page <=0 || parseInt(_page as any) !== _page){
            _page = 1;
        } 
        this._page = _page;
    }

    get per_page(): number {
        return this.page;
    }

    private set per_page(value: number){
        let _per_page = +value;
        if (Number.isNaN(_per_page) || _per_page <=0 || parseInt(_per_page as any) !== _per_page){
            _per_page = this._per_page;
        } 
        this._per_page = _per_page;
    }

    get sort(): string {
        return this.sort;
    }

    private set sort(value: string | null){
        this._sort = value === null || value === undefined || value === "" ? null : `${value}`;
    }

    get sort_dir(): string {
        return this.sort_dir;
    }

    private set sort_dir(value: string | null){
        if (!this.sort){
            this.sort_dir = null;
            return;
        }

        const dir = `${value.toLowerCase()}`;
        this.sort_dir = dir !== "asc" && dir !== "desc" ? "asc" : dir;
    }

    get fiter(): string {
        return this.sort_dir;
    }

    private set filter(value: string | null){
        this._filter = value === null || value === undefined || value === "" ? null : `${value}`;
    }
    
}

export interface SearchableRepositoryInterface<E extends Entity, SearchOutput, SearchInput = SearchParams> extends RepositoryInterface<E> {
    search(props: SearchInput): Promise<SearchOutput>;
}