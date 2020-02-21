// Patron modulo
const modulo = (() => {
  'use strict';

  let deck = [],
    puntosJugadores = [];

  const tipos = ['C', 'D', 'H', 'S'],
    especiales = ['A', 'J', 'Q', 'K'];

  // Referencias HTML
  const btnPedir = document.getElementById('btnPedir'),
    btnDetener = document.getElementById('btnDetener'),
    puntajes = document.querySelectorAll('small'),
    cartasJugadores = document.querySelectorAll('.div-cartas');

  // Inicializando la baraja de cartas
  const iniciarJuego = (numJugadores = 2) => {
    deck = crearDeck();
    puntosJugadores = [];

    for (let i = 0; i < numJugadores; i++) {
      puntosJugadores.push(0);
    }

    puntajes.forEach((el) => (el.innerText = 0));
    cartasJugadores.forEach((el) => (el.innerHTML = ''));
    btnPedir.disabled = false;
    btnDetener.disabled = false;
  };

  const crearDeck = () => {
    deck = [];

    for (let i = 2; i <= 10; i++) {
      for (const tipo of tipos) {
        deck.push(i + tipo);
      }
    }

    for (const tipo of tipos) {
      for (const especial of especiales) {
        deck.push(especial + tipo);
      }
    }
    return _.shuffle(deck);
  };

  const pedirCarta = () => {
    if (deck.length === 0) throw 'No hay mas cartas';
    return deck.pop();
  };

  const acumularPuntos = (carta, turno) => {
    puntosJugadores[turno] += valorCarta(carta);
    puntajes[turno].innerText = `${puntosJugadores[turno]}`;
    return puntosJugadores[turno];
  };

  const crearCarta = (carta, turno) => {
    const imgCarta = document.createElement('img');

    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    cartasJugadores[turno].append(imgCarta);
  };

  const determinarGanador = () => {
    const [puntosMinimos, puntosComputador] = puntosJugadores;

    setTimeout(() => {
      if (puntosComputador === puntosMinimos) {
        alert('Nadie ganó :(');
      } else if (puntosMinimos > 21) {
        alert('Computador ganó');
      } else if (puntosComputador > 21) {
        alert('Jugador ganó');
      } else {
        alert('Computador ganó');
      }
    }, 100);
  };

  const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return isNaN(valor) ? (valor === 'A' ? 11 : 10) : Number(valor);
  };

  const turnoComputador = (puntosMinimos) => {
    let puntosComputador = 0;

    do {
      const carta = pedirCarta();

      puntosComputador = acumularPuntos(carta, puntosJugadores.length - 1);
      crearCarta(carta, puntosJugadores.length - 1);
    } while (puntosComputador < puntosMinimos && puntosMinimos <= 21);

    determinarGanador();
  };

  // Eventos
  btnPedir.addEventListener('click', () => {
    const carta = pedirCarta(),
      puntosJugador = acumularPuntos(carta, 0);

    crearCarta(carta, 0);

    if (puntosJugador > 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputador(puntosJugador);
    } else if (puntosJugador === 21) {
      btnPedir.disabled = true;
      btnDetener.disabled = true;
      turnoComputador(puntosJugador);
    }
  });

  btnDetener.addEventListener('click', () => {
    btnPedir.disabled = true;
    btnDetener.disabled = true;
    turnoComputador(puntosJugadores[0]);
  });

  // A traves del return se especifica el codigo que sera publico
  return {
    nuevoJuego: iniciarJuego
  };
})();
