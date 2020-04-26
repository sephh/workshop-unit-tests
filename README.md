# 05 - Disparando Eventos

Agora vamos testar o disparo de alguns eventos usando a API `fireEvent` da lib `@testing-library/angular`.

Nosso componente tem um input e queremos saber se nossa tarefa está sendo salva quando o usuário aperta o `Enter` ou tira o foco do input.

## fireEvent

Vamos importar o `fireEvent`;

```
import {render, RenderResult, fireEvent} from '@testing-library/angular';
```

No teste `should save changes on keydown Enter` vamos disparar o evento keydown na tecla `Enter`.

```
it('should have a description', () => {
    const {container} = renderResult;

    component.task = {
      id: 'mock-id',
      label: 'Minha tarefa',
      done: false
    };

    fixture.detectChanges();

    expect(container.textContent).toMatch(component.task.label);
});
```

Agora vamos testar o `should have a default description`.

```
it('should have a default description', () => {
    const {container} = renderResult;

    component.task = {
      id: 'mock-id',
      label: '',
      done: false
    };

    fixture.detectChanges();

    expect(container.textContent).toMatch(component.labelDefault);
});
```

Nós repetimos duas vezes a criação da task para testar um atributo diferente da classe. 

Se essa classe tiver vários atributos nós vamos ter que instanciar um objeto diferente a cada teste. E pior, temos que adicionar todos os campos obrigatórios, mesmo que nosso objetivo seja testar um único atributo.

Nós poderíamos colocar esse dado no `beforeEach`, mas se outro componente precisasse simular o mesmo objeto, essa lógica seria replicada. E se um atributo obrigatório fosse acrescentado teríamos que atualizar todos os `beforeEach` de cada teste.

## Teste Builder

Teste builder ao resgate!

Com esse pattern nós podemos criar diversos objetos de forma mais escalável.

Vamos refatorar os testes.

```
describe('TaskItemComponent', () => {
    let taskTestBuilder;
    ...
    
    beforeEach(async () => {
        renderResult = await render(TaskItemComponent, {
          imports: [
            MatIconModule,
            MatFormFieldModule,
            ReactiveFormsModule
          ]
        });
        taskTestBuilder = new TaskTestBuilder();
        fixture = renderResult.fixture;
        component = fixture.componentInstance;
    });

  ...
```

```
it('should have a description', () => {
    const {container} = renderResult;

    component.task = taskTestBuilder
      .withLabel('Minha tarefa')
      .build();

    ....
```

```
it('should have a default description', () => {
    const {container} = renderResult;

    component.task = taskTestBuilder
      .withLabel('')
      .build();

    ...
```

## Mock functions

Agora vamos simular algumas funções.

Nosso primeiro mock de função vai ser o o método stopPropagation, que apesar de fazer parte do componente ele é axiliar e serve para disparar eventos de elementos HTML, o que não deixar de ser uma dependência.

```
beforeEach(async () => {
    renderResult = await render(TaskItemComponent, {
      imports: [
        MatIconModule,
        MatFormFieldModule,
        ReactiveFormsModule,
        MatInputModule,
      ]
    });
    taskTestBuilder = new TaskTestBuilder();
    fixture = renderResult.fixture;
    component = fixture.componentInstance;
    component.stopPropagation = jest.fn();
  });
```

Além do mock foi acrescentada a dependência `MatInputModule`, que nós havíamos esquecido.

E nosso teste `should delete a task` fica assim:

```
it('should delete a task', () => {
    const {getByTitle} = renderResult;
    const removeTaskMock = jest.fn((task: Task) => task);

    component.task = taskTestBuilder.build();
    component.removeTask.emit = removeTaskMock;

    fixture.detectChanges();

    const removeButton = getByTitle('Remover');

    removeButton.click();

    expect(removeTaskMock).toBeCalledTimes(1);
    expect(removeTaskMock).toHaveBeenCalledWith(component.task);
    expect(removeTaskMock.mock.results[0].value).toBe(component.task);
    expect(component.stopPropagation).toHaveBeenCalled();
});
```

E nosso teste `should edit a task` fica assim:

```
it('should edit a task', () => {
    const {getByTitle, getByPlaceholderText} = renderResult;
    const editTaskMock = jest.fn((task: Task) => task);
    const setValueMock = jest.fn((text: string) => text);

    component.task = taskTestBuilder.build();
    component.editTask.emit = editTaskMock;

    component.ngOnInit();
    fixture.detectChanges();

    component.form.controls.label.setValue = setValueMock;

    const editButton = getByTitle('Editar');

    editButton.click();

    fixture.detectChanges();

    const inputElement = getByPlaceholderText('Digite a descrição da tarefa...');

    expect(component.stopPropagation).toHaveBeenCalled();
    expect(setValueMock).toHaveBeenCalledTimes(1);
    expect(setValueMock).toHaveBeenCalledWith(component.task.label);
    expect(editTaskMock).toHaveBeenCalledTimes(1);
    expect(editTaskMock).toHaveBeenCalledWith(component.task);
    expect(editTaskMock.mock.results[0].value).toBe(component.task);
    expect(component.editing).toBe(true);
    expect(inputElement).toBe(document.activeElement);
});
```
