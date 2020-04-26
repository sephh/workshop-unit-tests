# 05 - Disparando Eventos

Agora vamos testar o disparo de alguns eventos usando `fireEvent` e `userEvent` da lib `@testing-library/angular`.

Nosso componente tem um input e queremos saber se nossa tarefa está sendo salva quando o usuário aperta o `Enter` ou tira o foco do input.

## fireEvent e userEvent

Vamos importar o `fireEvent` e o `userEvent`;

```
import {render, RenderResult, fireEvent, userEvent} from '@testing-library/angular';
```

No teste `should save changes on keydown Enter` vamos disparar o evento keydown na tecla `Enter`.

```
it('should save changes on keydown Enter', () => {
  const {getByTitle, getByPlaceholderText} = renderResult;
  const updateTaskMock = jest.fn((task: Task) => task);
  const newLabel = 'Tarefa atualizada';

  component.task = taskTestBuilder.build();
  component.updateTask.emit = updateTaskMock;

  component.ngOnInit();
  fixture.detectChanges();

  const editButton = getByTitle('Editar');

  editButton.click();

  fixture.detectChanges();

  const inputElement = getByPlaceholderText('Digite a descrição da tarefa...');

  userEvent.type(inputElement, newLabel);
  fireEvent.keyDown(inputElement, {key: 'Enter', code: 'Enter'});

  expect(updateTaskMock).toHaveBeenCalledTimes(1);
  expect(updateTaskMock).not.toHaveBeenCalledWith(component.task);
  expect(updateTaskMock.mock.results[0].value).toEqual({...component.task, label: newLabel});
});
```

No próximo teste, `should save changes on blur`, a única coisa que muda é o evento disparado. Podemos criar uma função para não repetir o código.

```
const saveOnEnterOrBlur = (event, options = {}) => {
    const {getByTitle, getByPlaceholderText} = renderResult;
    const updateTaskMock = jest.fn((task: Task) => task);
    const newLabel = 'Tarefa atualizada';

    component.task = taskTestBuilder.build();
    component.updateTask.emit = updateTaskMock;

    component.ngOnInit();
    fixture.detectChanges();

    const editButton = getByTitle('Editar');

    editButton.click();

    fixture.detectChanges();

    const inputElement = getByPlaceholderText('Digite a descrição da tarefa...');

    userEvent.type(inputElement, newLabel);
    event(inputElement, options);

    expect(updateTaskMock).toHaveBeenCalledTimes(1);
    expect(updateTaskMock).not.toHaveBeenCalledWith(component.task);
    expect(updateTaskMock.mock.results[0].value).toEqual({...component.task, label: newLabel});
}
```

Agora nossos testes podem ficar assim:

```
it('should save changes on keydown Enter', () => {
    saveOnEnterOrBlur(fireEvent.keyDown, { key: 'Enter', code: 'Enter' });
});
```

```
it('should save changes on blur', () => {
    saveOnEnterOrBlur(fireEvent.blur);
});
```

A mesma coisa acontece quando não se deve salvar a task, nesses eventos. 

Então vamos criar uma função para isso também.

```
const dontSaveOnEnterOrBlur = (event, options = {}) => {
    const {getByTitle, getByPlaceholderText} = renderResult;
    const editTaskMock = jest.fn((task: Task) => task);
    let editCallCounter = 0;

    component.task = taskTestBuilder.build();
    component.editTask.emit = editTaskMock;

    component.ngOnInit();
    fixture.detectChanges();

    const editButton = getByTitle('Editar');

    editButton.click();
    editCallCounter++;

    fixture.detectChanges();

    const inputElement = getByPlaceholderText('Digite a descrição da tarefa...');

    event(inputElement, options);
    editCallCounter++;

    expect(editTaskMock).toHaveBeenCalledTimes(editCallCounter);
    expect(editTaskMock).toHaveBeenCalledWith(null);
    expect(editTaskMock.mock.results[editCallCounter - 1].value).toEqual(null);
}
```

E os testes ficariam assim:

```
it('should not save on Enter', () => {
    dontSaveOnEnterOrBlur(fireEvent.keyDown, { key: 'Enter', code: 'Enter' });
});
```

```
it('should not save on blur', () => {
    dontSaveOnEnterOrBlur(fireEvent.blur);
});
```
