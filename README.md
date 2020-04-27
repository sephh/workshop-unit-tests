# 06 - Testando Serviços

Nessa branch nós vamos testar um componente com `injeções de dependência`.

Vamos aprender como usar e fazer um mock de um serviço.

## TasksComponent

Vamos ao teste do componente encontrado em `src/app/modules/task/pages/tasks/tasks.component.spec.ts`.

A primeira coisa que vamos fazer é remover o import do `StateModule`, pois ele vai ser uma assunto para o próximo workshop.

Vocês vão observar que ao rodar os testes novamente, o teste de render que passa agora emite um erro:

`NullInjectorError: StaticInjectorError(DynamicTestModule)[Store]`

Isso acontece porque a Store era uma dependência carregada pelo módulo que nós removemos e ela está relacionada diretamente com a dependência `TasksFacade`, do nosso componente.

Como nosso propósito aqui não é falar sobre `Redux` e nem de `NGRX`, vamos criar um mock para o `TasksFacade` e remover essa dependência dele.

## Injetando nosso mock

Vamos adicionar à nossa função `render` o atributo `providers` com o nosso mock.

```
beforeEach(async () => {
    renderResult = await render(TasksComponent, {
      ...
      providers:[
        {
          provide: TasksFacade,
          useClass: TasksFacadeMock
        }
      ]
    });

    ...
``` 

Pronto, agora nosso teste de render não quebra mais.

## Testes com o provider mockado

É um teste semelhante aos que nós já fizemos com algumas novidades, por conta dos observables da dependência.

```
it('should load tasks', async () => {
    const {getByText} = renderResult;
    tasksFacadeMock.flushTasks(tasks);

    const tasks$ = await component.task$
      .pipe(
        take(1)
      ).toPromise();
    const loading$ = await component.loading$
      .pipe(
        take(1)
      ).toPromise();
    const selectedTaskId$ = await component.selectedTaskId$
      .pipe(
        take(1)
      ).toPromise();

    fixture.detectChanges();

    tasks.forEach((t) => {
      expect(getByText(t.label)).toBeInTheDocument();
    });
    expect(tasks$.length).toBe(3);
    expect(loading$).toBe(false);
    expect(selectedTaskId$).toBe('');
    expect(component.tasksFacade.getTasks).toHaveBeenCalled();
});
```

Agora não temos mais conteúdo novo.

Vamos fazer juntos os demais testes. Espero que tenham gostado.

Obrigado.
