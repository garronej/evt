import { $Matcher } from "./$Matcher";

export type Matcher<T, U = T> = $Matcher<T,U> | ((data: U)=> boolean);

/*
function f<T,U>(m: Matcher<T,U>){
}

f((data: string)=> true);
*/
