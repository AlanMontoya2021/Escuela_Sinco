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
    public class TDocsController : ApiController
    {
        private SSDBV2Container db = new SSDBV2Container();

        // GET: api/TDocs
        public IQueryable<TDoc> GetTDocs()
        {
            return db.TDocs;
        }

        // GET: api/TDocs/5
        [ResponseType(typeof(TDoc))]
        public IHttpActionResult GetTDoc(int id)
        {
            TDoc tDoc = db.TDocs.Find(id);
            if (tDoc == null)
            {
                return NotFound();
            }

            return Ok(tDoc);
        }

        // PUT: api/TDocs/5
        [ResponseType(typeof(void))]
        public IHttpActionResult PutTDoc(int id, TDoc tDoc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (id != tDoc.Id)
            {
                return BadRequest();
            }

            db.Entry(tDoc).State = EntityState.Modified;

            try
            {
                db.SaveChanges();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!TDocExists(id))
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

        // POST: api/TDocs
        [ResponseType(typeof(TDoc))]
        public IHttpActionResult PostTDoc(TDoc tDoc)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            db.TDocs.Add(tDoc);
            db.SaveChanges();

            return CreatedAtRoute("DefaultApi", new { id = tDoc.Id }, tDoc);
        }

        // DELETE: api/TDocs/5
        [ResponseType(typeof(TDoc))]
        public IHttpActionResult DeleteTDoc(int id)
        {
            TDoc tDoc = db.TDocs.Find(id);
            if (tDoc == null)
            {
                return NotFound();
            }

            db.TDocs.Remove(tDoc);
            db.SaveChanges();

            return Ok(tDoc);
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }

        private bool TDocExists(int id)
        {
            return db.TDocs.Count(e => e.Id == id) > 0;
        }
    }
}