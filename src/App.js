
import React from 'react';
import List from './List'
import './App.css'

const newRandomCard = () => {
  const id = Math.random().toString(36).substring(2, 4)
    + Math.random().toString(36).substring(2, 4);
  return {
    id,
    title: `Random Card ${id}`,
    content: 'lorem ipsum',
  }
}
class App extends React.Component {
  static defaultProps = {
    store: {
      lists: [],
      allCards: {},
    }
  };
  constructor(props) {
    super(props); 
    this.state = {
      store: {
        lists: [
          {
            id: '1',
            header: 'First list',
            cardIds: [ 'a', 'b', 'e', 'f', 'g', 'j', 'l', 'm' ],
          },
          {
            id: '2',
            header: 'Second list',
            cardIds: ['b', 'c', 'd', 'f', 'h', 'i', 'k'],
          },
          {
            id: '3',
            header: 'Third list',
            cardIds: [ 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm' ],
          },
          {
            id: '4',
            header: 'Fourth list',
            cardIds: [ 'l', 'm' ],
          },
        ],
        allCards: {
          'a': { id: 'a', title: 'First card', content: 'lorem ipsum' },
          'b': { id: 'b', title: 'Second card', content: 'lorem ipsum' },
          'c': { id: 'c', title: 'Third card', content: 'lorem ipsum' },
          'd': { id: 'd', title: 'Fourth card', content: 'lorem ipsum' },
          'e': { id: 'e', title: 'Fifth card', content: 'lorem ipsum' },
          'f': { id: 'f', title: 'Sixth card', content: 'lorem ipsum' },
          'g': { id: 'g', title: 'Seventh card', content: 'lorem ipsum' },
          'h': { id: 'h', title: 'Eighth card', content: 'lorem ipsum' },
          'i': { id: 'i', title: 'Ninth card', content: 'lorem ipsum' },
          'j': { id: 'j', title: 'Tenth card', content: 'lorem ipsum' },
          'k': { id: 'k', title: 'Eleventh card', content: 'lorem ipsum' },
          'l': { id: 'l', title: 'Twelfth card', content: 'lorem ipsum' },
          'm': { id: 'm', title: 'Thirteenth card', content: 'lorem ipsum' },
        },
      }
    };
    // this.handleDeleteCard = this.handleDeleteCard.bind(this)
}
  handleRandomCard = (listId) => {
    let newCard = newRandomCard();
    console.log(newCard);
    console.log(listId);
    //update the new card into the list with the listId
    let addNewCardToList = this.state.store.lists.map(list=>{
      if (list.id === listId) { // if the list id is a match
        return {
          ...list, //return the list with the newest cardId info
          cardIds: [...list.cardIds, newCard.id]
        }
      }
      return list; // else return the original lists
    });
    this.setState({
      store: {
        lists: addNewCardToList, //replace the old lists with the update list
        allCards: { 
        ...this.state.store.allCards, //add the newCard object to the allCards object
        [newCard.id]: newCard
        }
      }
    })

  }
  handleDeleteCard = (cardNumber, listNumber) => {
    // find matching card and omit it
    const cards = this.state.store.allCards
    let matchingCard = Object.keys(cards).find(card=> card === cardNumber)
    function omit(obj, keytoOmit){
      let {[keytoOmit]:_,...rest} = obj;
      return rest;
    }
    let newCards = omit(cards, matchingCard);
    
    //find matching card in each lists cardid array
    let newLists = this.state.store.lists.map(li => {
      let cardIds = li.cardIds.filter(card => card !== matchingCard)
      return {...li, cardIds}
    })
 
    this.setState({
      store: {
        lists: newLists,
        allCards: newCards
      }
    })
  }
 

  render() {
    return (
      <main className='App'>
        <header className='App-header'>
          <h1>Trelloyes!</h1>
        </header>
        <div className='App-list'>
          {this.state.store.lists.map(list => (
            <List
              key={list.id}
              listId={list.id}
              header={list.header}
              cards={list.cardIds.map(key => this.state.store.allCards[key])}
              randomCard={this.handleRandomCard}
              deleteCard={this.handleDeleteCard}
            />
          ))}
        </div>
      </main>
    );
  }
}

export default App;