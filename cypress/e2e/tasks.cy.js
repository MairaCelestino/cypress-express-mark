/// <reference types="cypress"  />

//import{faker} from '@faker-js/faker' 
//////criação de dados fakers //////massa de testes dinamica

describe('tarefas', () => {

    let testData;

    before(()=> {
        cy.fixture('tasks').then(t => {
            testData = t
        })
         
    })

    beforeEach(() => {
       // cy.viewport(1990, 1100)
    })


    context('cadastro', () => {
        it('deve cadastrar uma nova tarefa', () => {

            const taskName = 'Ler um livro de Java'

            cy.removeTaskByName(taskName)
            cy.createTask(taskName)

            cy.contains('main div p', 'task')
                .should('be.visible')
        })

        it('não deve permirtir tarefas duplicada', () => {

            const task = testData.dup

            cy.removeTaskByName(task.name)
            cy.postTask(task)
            cy.createTask(task.name)

            cy.get('.swal2-html-container')
                .should('be.visible')
                .should('have.text', 'Task already exists!')

        })

        it('campo obrigatório', () => {

            cy.createTask()
            cy.isRequired('This is a required field')

        })

    })

    context('atualização', () => {
        it('deve concluir uma tarefa', () => {

            const task = {
                name: 'pagar contas de consumo',
                is_done: false
            }

            cy.removeTaskByName(task.name)
            cy.postTask(task)

            cy.visit('/')

            cy.contains('p', task.name)
                .parent()
                .find('button[class*=ItemToggle]')
                .click()

            cy.contains('p', task.name)
                .should('have.css', 'text-decoration-line', 'line-through')

        })

    context('exclusão', () => {
        it('deve remover uma tarefa', () => {

                const task = {
                    name: 'Estudar JavaScript',
                    is_done: false  
                }

                cy.removeTaskByName(task.name)
                cy.postTask(task)

                cy.visit('/')

                cy.contains('p', task.name)
                    .parent()
                    .find('button[class*=ItemDelete]')
                    .click()

                cy.contains('p', task.name)
                    .should('not.exist')

            })
        })

    })
})
