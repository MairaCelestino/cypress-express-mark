/// <reference types="cypress"  />

//import{faker} from '@faker-js/faker' 
//////criação de dados fakers //////massa de testes dinamica

describe('tarefas', () => {

    it('deve cadastrar uma nova tarefa', () => {

        cy.request({
            url: 'http://localhost:3333/helper/tasks',
            method: 'DELETE',
            body: { name: 'Ler um livro de Java' }
        }).then(response => {
            expect(response.status).to.eq(204)
        })


        cy.visit('http://localhost:8080/')

        cy.get('input[placeholder="Add a new Task"]')
            // .type(faker.music.songName())
            .type('Ler um livro de Java')

        cy.contains('button', 'Create').click()

        /* cy.get('main div p')
             .should('be.visible')
             .should('have.text', 'Ler um livro de Java')*/

        cy.contains('main div p', 'Ler um livro de Java')
            .should('be.visible')
    })

})