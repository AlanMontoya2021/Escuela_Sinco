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
    public class TipoPersonasController : ApiController
    {
        private SSDBV2Container db = new SSDBV2Container();

        // GET: api/TipoPersonas
        public IQueryable<TipoPersona> GetTipoPersonas()
        {
            return db.TipoPersonas;
        }

        // GET: api/TipoPersonas/5
        [ResponseType(typeof(TipoPersona))]
        public IHttpActionResult GetTipoPersona(int id)
        {
            TipoPersona tipoPersona = db.TipoPersonas.Find(id);
            if (tipoPersona == null)
            {
                return NotFound();
            }

            return Ok(tipoPersona);
        }

        // PUT: api/TipoPersonas/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTipoPersona(int id, TipoPersona tipoPersona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tipoPersona.Id)
            {
                return BadRequest();
            }

            db.Entry(tipoPersona).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TipoPersonaExists(id))
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

        // POST: api/TipoPersonas
        [ResponseType(typeof(TipoPersona))]
        public IHttpActionResult PostTipoPersona(TipoPersona tipoPersona)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TipoPersonas.Add(tipoPersona);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tipoPersona.Id }, tipoPersona);
        }

        // DELETE: api/TipoPersonas/5
        [ResponseType(typeof(TipoPersona))]
        public IHttpActionResult DeleteTipoPersona(int id)
        {
            TipoPersona tipoPersona = db.TipoPersonas.Find(id);
            if (tipoPersona == null)
            {
                return NotFound();
            }

            db.TipoPersonas.Remove(tipoPersona);
            db.SaveChanges();

            return Ok(tipoPersona);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TipoPersonaExists(int id)
        {
            return db.TipoPersonas.Count(e => e.Id == id) > 0;
        }
    }
}