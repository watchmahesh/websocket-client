/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as io from 'socket.io-client';
// import { RedisService } from 'src/redis.service';

@Injectable()
export class BalanceService {
  private socket;

  constructor() {
    this.socket = io.connect(process.env.SERVER_URL);

    // Handle 'balance' events
    this.socket.on('getBalance', ({ balance }) => {
      console.log(`Received balance from server: ${balance}`);
    });

    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });

  }



  async requestUserBalance(userId: string): Promise<number> {
    try {
      return new Promise<number>((resolve, reject) => {
        // Listen for the 'getBalance' response
        const onBalanceReceived = ({ balance }) => {
          resolve(balance);

          // Remove the listener to avoid memory leaks
          this.socket.off('getBalance', onBalanceReceived);
        };

        // Listen for 'balanceError' in case of errors
        const onBalanceError = ({ error }) => {
          reject(new Error(error));

          // Remove the listener to avoid memory leaks
          this.socket.off('balanceError', onBalanceError);
        };

        // Attach listeners
        this.socket.once('getBalance', onBalanceReceived);
        this.socket.once('balanceError', onBalanceError);

        // Emit 'getBalance' event to the server
        this.socket.emit('getBalance', { userId });
      });
    } catch (error) {
      // Handle any synchronous errors
      throw error;
    }
  }


}
