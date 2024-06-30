import React from 'react'

export default function Main({rotation}) {
  return (
    <div style={{transform: `rotate(${rotation})`}} className='bodyContainer'>
      <header id='c-header'>
        <h1>Welcome to our Random Website!</h1>
    </header>
    <section id='c-section'>
        <h2>About Us</h2>
        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis vehicula velit eu purus eleifend, eget pharetra lectus sollicitudin. Nam vel sodales felis, nec varius urna. Nullam ut magna sed turpis convallis rhoncus.</p>
    </section>
    <section id='c-section'>
        <h2 id='c-h2'>Our Services</h2>
        <ul id='c-ul'>
            <li id='c-li'>Service 1</li>
            <li id='c-li'>Service 2</li>
            <li id='c-li'>Service 3</li>
            <li id='c-li'>Service 4</li>
        </ul>
    </section>
    <aside id='c-aside'>
        <h2 id='c-h2'>Latest News</h2>
        <ul id='c-ul'>
            <li id='c-li'><strong>Breaking News:</strong> New feature added to our platform!</li>
            <li id='c-li'><strong>Event Reminder:</strong> Don't forget about our upcoming webinar.</li>
            <li id='c-li'><strong>Customer Spotlight:</strong> Read about how our product helped a client.</li>
        </ul>
    </aside>
    <footer id='c-footer'>
        <p>&copy; 2024 Random Website. All rights reserved.</p>
    </footer>
    </div>
  )
}
