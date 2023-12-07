/* eslint-disable prettier/prettier */
import { Injectable } from '@nestjs/common';
import * as io from 'socket.io-client';

@Injectable()
export class BalanceService {
  private socket;

  constructor() {
    const userId = '2';
    this.socket = io.connect(process.env.SERVER_URL, {
      query: { userId },
    });
    // Handle 'balance' events
    this.socket.on('getBalance', (data) => {
      console.log(data)
      console.log(`User ${data.userid} balance is: ${JSON.parse(JSON.stringify(data.balance))}`);
    });

    this.socket.on('connect', () => {
      console.log('Connected to the server');
    });


  }



  async requestUserBalance(userId: string): Promise<number> {
    try {
      return await new Promise<number>((resolve) => {
        // Listen for the 'getBalance' response
        const onBalanceReceived = ({ balance }: { balance: number }) => {
          console.log(balance);
          resolve(balance);

          // Remove the listener to avoid memory leaks
          this.socket.off('getBalance', onBalanceReceived);
        };

        // Attach listeners
        this.socket.on('getBalance', onBalanceReceived);

        // Emit 'getBalance' event to the server
        this.socket.emit('getBalance', { userId });
      });
    } catch (error) {
      throw error;
    }
  }


}
