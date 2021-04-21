using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Data.Entity.Infrastructure;
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
    public class PersonaMateriasController : ApiController
    {
        private SSDBV2Container db = new SSDBV2Container();

        // GET: api/PersonaMaterias
        public IQueryable GetPersonaMaterias()
        {
            var lst = (from a in db.PersonaMaterias
                        join b in db.Personas on a.Persona_Id equals b.Id
                        join c in db.Materias on a.Materia_Id equals c.Id
                        
                       select new
                    {
                            IdDocente = a.Id,
                            IdMateria=a.Materia_Id,
                            IdPersona=a.Persona_Id,
                           NombrePersona = b.Nombres,
                           ApellidoPersona = b.Apellidos,
                            Materia = c.Nombre,
                            TipoPersona = b.Tp_Id
                    });
            
            return lst;
        }

        // GET: api/PersonaMaterias/5
        [ResponseType(typeof(PersonaMateria))]
        public IHttpActionResult GetPersonaMateria(int id)
        {
            PersonaMateria personaMateria = db.PersonaMaterias.Find(id);
            if (personaMateria == null)
            {
                return NotFound();
            }

            return Ok(personaMateria);
        }

        // PUT: api/PersonaMaterias/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutPersonaMateria(int id, PersonaMateria personaMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != personaMateria.Id)
            {
                return BadRequest();
            }

            db.Entry(personaMateria).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PersonaMateriaExists(id))
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

        // POST: api/PersonaMaterias
        [ResponseType(typeof(PersonaMateria))]
        public IHttpActionResult PostPersonaMateria(PersonaMateria personaMateria)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.PersonaMaterias.Add(personaMateria);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = personaMateria.Id }, personaMateria);
        }

        // DELETE: api/PersonaMaterias/5
        [ResponseType(typeof(PersonaMateria))]
        public IHttpActionResult DeletePersonaMateria(int id)
        {
            PersonaMateria personaMateria = db.PersonaMaterias.Find(id);
            if (personaMateria == null)
            {
                return NotFound();
            }

            db.PersonaMaterias.Remove(personaMateria);
            db.SaveChanges();

            return Ok(personaMateria);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool PersonaMateriaExists(int id)
        {
            return db.PersonaMaterias.Count(e => e.Id == id) > 0;
        }
    }
}