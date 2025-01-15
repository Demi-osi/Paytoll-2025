import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
//import Home from '../app/page'
import Hero from '../components/landing-page/hero'

const Hold = "Skip the lines and breeze through toll gates with our fast, secure payment app. Pay tolls instantly, track your trips, and manage your balance all in one place. Simplify your journey with hassle-free, cashless payments—anytime, anywhere."
 
/*test('Home', () => {
  render(<Home />)
  expect(screen.getByRole('heading', { level: 1, name: 'Heading' })).toBeDefined()
  //getByText(container, 'Hello World') 
})*/

test('Hero Component heaver', () => {
      render(<Hero />); // Render the Hero component
      
      // Example check - adapt this according to what your hero contains
      expect(screen.getByRole('heading', { level: 1, name: 'PayToll' })).toBeDefined();
      //expect(screen.getByText(/^Skip the lines /)).toBeDefined();
      //expect(screen.getByText(/learn more about us/i)).toBeInTheDocument();
  })

  test('Hero Component paragraph', () => {
    //render(<Hero />); // Render the Hero component

    expect(screen.getByText(/^Skip the lines /)).toBeDefined();
    //expect(screen.getAllByText(/^Skip the lines /)).toBeDefined();
})