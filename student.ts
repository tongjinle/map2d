import Person from './person';
import * as _ from 'underscore';

class Student extends Person {
	
	constructor(name:string,public sex:number) {
		super(name);
	}

	say(){
		let arr = [1, 2, 3];
		_.map(arr, n => 2 * n);
		console.log(arr);
	}
}

export default Student;