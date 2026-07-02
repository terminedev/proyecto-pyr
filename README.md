* Empezar a jugar. 
  * Se escojen las 10 preguntas aleatorias. 
  * El jugador va respondiendo una por una:
    - Si acierta:
      - Gana (puntaje_total += 100 * (1 + (n - 1) / 10)) puntos.
    - Si pierde: 
      - Resta (puntaje_total -= 50 * (1 - (n - 1) / 20)) puntos.

  * El puntaje obtenido se compara con el anterior para ver si hay nuevo record.
  * Se suma al puntaje total acumulado. 

