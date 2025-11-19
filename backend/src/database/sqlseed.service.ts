import { Injectable, OnModuleInit } from '@nestjs/common';
import { DataSource } from 'typeorm';
import { join } from 'path';
import { readFileSync } from 'fs';

@Injectable()
export class SqlSeedService implements OnModuleInit {
    constructor(private readonly dataSource: DataSource) {}
    async onModuleInit() {
        try {
            // Verificar si la tabla ya tiene datos
            const result = await this.dataSource.query<{ count: string }[]>(
                `SELECT COUNT(*) as count FROM books`,
            );

            const count = parseInt(result[0].count, 10);
            if (count > 0) {
                console.log('📚 Seed ignorado: la tabla books ya tiene datos.');
                return;
            }

            // Leer archivo SQL
            const filePath = join(process.cwd(), 'src/database/books.sql');
            const sql = readFileSync(filePath, 'utf8');

            // Ejecutar SQL
            await this.dataSource.query(sql);

            console.log('📚 Seed ejecutado: books.sql importado exitosamente');
        } catch (error) {
            console.error('❌ Error ejecutando el seed SQL:', error);
        }
    }
}
