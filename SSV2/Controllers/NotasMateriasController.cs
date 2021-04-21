using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
using System.Data.SqlClient;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Cors;
using System.Web.Http.Description;
using SSV2.Models;

namespace SSV2.Controllers
{
    [EnableCors(origins: "*", headers: "*", methods: "*")]
    public class NotasMateriasController : ApiController
    {
        private SSDBV2Container db = new SSDBV2Container();

        // GET: api/NotasMaterias
        public IQueryable<NotasMateria> GetNotasMaterias()
        {
            return db.NotasMaterias;
        }

        // GET: api/NotasMaterias/5
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult GetNotasMateria(int id)
        {
            NotasMateria notasMateria = db.NotasMaterias.Find(id);
            if (notasMateria == null)
            {
                return NotFound();
            }

            return Ok(notasMateria);
        }

        // PUT: api/NotasMaterias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutNotasMateria(int id, NotasMateria notasMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != notasMateria.Id)
            {
                return BadRequest();
            }

            db.Entry(notasMateria).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!NotasMateriaExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return StatusCode(HttpStatusCode.NoContent);
        }

        // POST: api/NotasMaterias
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult PostNotasMateria(NotasMateria notasMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.Database.ExecuteSqlCommand(
           "EXEC sp_insertarnota @nota , @id_periodo,@id_materia,@id_estudiante",
           new SqlParameter("@nota", notasMateria.Notas),
           new SqlParameter("@id_periodo", notasMateria.Periodo_Id),
           new SqlParameter("@id_materia", notasMateria.Materia_id),
           new SqlParameter("@id_estudiante", notasMateria.Estudiante_id));

            
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = notasMateria.Id }, notasMateria);
        }

        // DELETE: api/NotasMaterias/5
        [ResponseType(typeof(NotasMateria))]
        public IHttpActionResult DeleteNotasMateria(int id, NotasMateria notasMateria)
        {
            if (notasMateria == null)
            {
                return NotFound();
            }

            db.Database.ExecuteSqlCommand(
           "EXEC sp_eliminarnota @id_materia,@id_persona,@id_nota1,@id_nota2",
           new SqlParameter("@id_materia", notasMateria.Materia_id),
           new SqlParameter("@id_persona", notasMateria.Estudiante_id),
           new SqlParameter("@id_nota1", id),
           new SqlParameter("@id_nota2", notasMateria.Notas));

            db.SaveChanges();

            return Ok(notasMateria);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool NotasMateriaExists(int id)
        {
            return db.NotasMaterias.Count(e => e.Id == id) > 0;
        }
    }
}