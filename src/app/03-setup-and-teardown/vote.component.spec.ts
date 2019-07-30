import { VoteComponent } from './vote.component'; 

describe('VoteComponent', () => {

  let component: VoteComponent;

  beforeEach(function() {
    component = new VoteComponent(); //Arrange
  });  

  it('Should increment totalVotes when upvoted', () => {

    component.upVote();                   //Act
    expect(component.totalVotes).toBe(1); // Assert

  });

  it('Should decrement totalVotes when downvoted', () => {

    component.downVote();  
    expect(component.totalVotes).toBe(0);

  });

});