import { $Matcher } from "./$Matcher";
export declare type Matcher<T, U = T> = $Matcher<T, U> | ((data: U) => boolean);
