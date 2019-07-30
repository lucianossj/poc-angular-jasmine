import { TodosComponent } from './todos.component'; 
import { TodoService } from './todo.service'; 
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/from';
import 'rxjs/add/observable/empty';
import 'rxjs/add/observable/throw';


describe('TodosComponent', () => {
  let component: TodosComponent;
  let service: TodoService;

  beforeEach(() => {

    service = new TodoService(null);

    component = new TodosComponent(service);

  });

  it('Should set todos property the items returned from the server', () => {

    let todos = [
        {id: 1, title: 'a'},
        {id: 2, title: 'b'},
        {id: 3, title: 'c'}
      ];

    spyOn(service, 'getTodos').and.callFake(() => {

      return Observable.from([todos]);

      component.ngOnInit();

      expect(component.todos.length).toBe(todos);

    });

  });

  it('Should call the server to save the cnahges whena a new todo item is added', () => {
    
    let spy = spyOn(service, 'add').and.callFake(t => {

      return Observable.empty();

    });

    component.add();

    expect(spy).toHaveBeenCalled();

  });

  it('Should add the new todo returned from the server', () => {
    
    let todo = { id: 1 };

    let spy = spyOn(service, 'add').and.returnValue(Observable.from([ todo ]));
    
    component.add();

    expect(component.todos.indexOf(todo)).toBeGreaterThan(-1);

  });

  it('Should set the message property if server returns an error when adding a new todo', () => {
    
    let error = 'error from the server';

    let spy = spyOn(service, 'add').and.returnValue(Observable.throw());
    
    component.add();

    expect(component.message).toBe(error);

  });

  it('Should call the server to delete a todo item if the user confirms', () => {
    
    spyOn(window, 'confirm').and.returnValue(true);
    let spy = spyOn(window, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).toHaveBeenCalledWith(1);

  });
  
  it('Should not call the server to delete a todo item if the user confirms', () => {
    
    spyOn(window, 'confirm').and.returnValue(false);
    let spy = spyOn(window, 'delete').and.returnValue(Observable.empty());

    component.delete(1);

    expect(spy).not.toHaveBeenCalled();

  });

});